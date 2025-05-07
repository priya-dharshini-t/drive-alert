import cv2
import pygame
import dlib
import numpy as np
import os
import smtplib
from dotenv import load_dotenv
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from scipy.spatial import distance
from imutils import face_utils
from twilio.rest import Client
from datetime import datetime

load_dotenv()
# Initialize pygame for alert sound
pygame.mixer.init()
pygame.mixer.music.load("audio/alert.wav")

# Twilio Credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
RECIPIENT_PHONE_NUMBER = os.getenv("RECIPIENT_PHONE_NUMBER")

# Email credentials
EMAIL_SENDER = "priyadharshinipriya1975@gmail.com"
EMAIL_PASSWORD = "REMOVED"
EMAIL_RECEIVER = "priyadharshinitcse2021@jerusalemengg.ac.in"

# Drowsiness Detection Parameters
EYE_ASPECT_RATIO_THRESHOLD = 0.25
EYE_ASPECT_RATIO_CONSEC_FRAMES = 48
COUNTER = 0
ALERT_TRIGGERED = False

# Load face detector and landmarks model
face_cascade = cv2.CascadeClassifier("classifiers/haarcascade_frontalface_default.xml")
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("model/model.dat")
(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)

def send_sms_alert():
    """Sends SMS alert using Twilio."""
    try:
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body="Drowsiness Detected! Stay Alert.",
            from_=TWILIO_PHONE_NUMBER,
            to=RECIPIENT_PHONE_NUMBER,
        )
        print("SMS Alert Sent:", message.sid)
    except Exception as e:
        print("Error sending SMS:", e)

def send_email_alert(frame):
    """Sends an email alert with an attached image."""
    try:
        if not os.path.exists("output"):
            os.makedirs("output")

        filename = "output/drowsy.jpg"
        cv2.imwrite(filename, frame)

        msg = MIMEMultipart()
        msg["From"] = EMAIL_SENDER
        msg["To"] = EMAIL_RECEIVER
        msg["Subject"] = "Drowsiness Alert!"
        msg.attach(MIMEText("Drowsiness Detected! See the attached image.", "plain"))

        with open(filename, "rb") as attachment:
            p = MIMEBase("application", "octet-stream")
            p.set_payload(attachment.read())
            encoders.encode_base64(p)
            p.add_header("Content-Disposition", f"attachment; filename={filename}")
            msg.attach(p)

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_SENDER, EMAIL_PASSWORD)
        server.sendmail(EMAIL_SENDER, EMAIL_RECEIVER, msg.as_string())
        server.quit()
        print("Email Alert Sent")
    except Exception as e:
        print("Error sending email:", e)

def start_drowsiness_detection(camera, history_collection):
    """Starts drowsiness detection."""
    global COUNTER, ALERT_TRIGGERED

    while True:
        success, frame = camera.read()
        if not success:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray, 0)

        for face in faces:
            shape = predictor(gray, face)
            shape = face_utils.shape_to_np(shape)
            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            ear = (eye_aspect_ratio(leftEye) + eye_aspect_ratio(rightEye)) / 2

            if ear < EYE_ASPECT_RATIO_THRESHOLD:
                COUNTER += 1
                if COUNTER >= EYE_ASPECT_RATIO_CONSEC_FRAMES and not ALERT_TRIGGERED:
                    pygame.mixer.music.play(-1)
                    send_email_alert(frame)
                    send_sms_alert()
                    ALERT_TRIGGERED = True

                    # Store alert in MongoDB
                    history_collection.insert_one({
                        "timestamp": datetime.now().isoformat(),
                        "message": "Drowsiness Detected!",
                        "image_path": "output/drowsy.jpg"
                    })
            else:
                pygame.mixer.music.stop()
                COUNTER = 0
                ALERT_TRIGGERED = False
