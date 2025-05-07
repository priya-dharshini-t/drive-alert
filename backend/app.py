from flask import Flask, Response, jsonify
import cv2
import threading
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from drowsiness_detection import start_drowsiness_detection

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["driver_drowsiness"]
history_collection = db["alert_history"]

# Initialize webcam
camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("Error: Could not open webcam")
    exit(1)

def generate_frames():
    """Generates frames for video streaming."""
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            ret, buffer = cv2.imencode(".jpg", frame)
            frame = buffer.tobytes()
            yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")

@app.route("/video_feed")
def video_feed():
    """Endpoint to stream video feed."""
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")

@app.route("/start-monitoring", methods=["GET"])
def start_monitoring():
    """Endpoint to start drowsiness monitoring."""
    if not camera.isOpened():
        return jsonify({"error": "Camera not available"}), 500

    thread = threading.Thread(target=start_drowsiness_detection, args=(camera, history_collection))
    thread.daemon = True
    thread.start()

    return jsonify({"message": "Monitoring started"}), 200

@app.route("/api/history", methods=["GET"])
def get_alert_history():
    """Fetch drowsiness alert history from MongoDB."""
    history = list(history_collection.find({}, {"_id": 0}))  # Remove MongoDB ObjectID
    return jsonify(history), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
