from scipy.spatial import distance
from imutils import face_utils
import numpy as np
import pygame 
import time
import dlib
import cv2
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
from dotenv import load_dotenv
from twilio.rest import Client  # Import Twilio for SMS

load_dotenv()
# Twilio Credentials (Replace with your actual credentials)
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")
RECIPIENT_PHONE_NUMBER = os.getenv("RECIPIENT_PHONE_NUMBER")

fromaddr="priyadharshinipriya1975@gmail.com" 
toaddr="priyadharshinitcse2021@jerusalemengg.ac.in"

def send_sms_alert():
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body="Drowsiness Detected! Stay Alert.",
        from_=TWILIO_PHONE_NUMBER,
        to=RECIPIENT_PHONE_NUMBER
    )
    print("SMS Alert Sent:", message.sid)

def mail(text):
     print(text)
     msg=MIMEMultipart()
     msg['From']=fromaddr
     msg['To']=toaddr
     msg['Subject']="NOT_SAFETY"
     body=text
     msg.attach(MIMEText(body,'plain'))
     filename="output/img.jpeg"
     attachment=open("output/img.jpeg","rb")
     p=MIMEBase('application','octet-stream')
     p.set_payload((attachment).read())
     encoders.encode_base64(p)
     p.add_header('Content-Disposition',"attachment; filename=%s"%filename)
     msg.attach(p)
     s=smtplib.SMTP('smtp.gmail.com',587)
     s.starttls()
     s.login(fromaddr,"REMOVED") 
     text=msg.as_string()
     s.sendmail(fromaddr,toaddr,text)
     s.quit()


pygame.mixer.init()
pygame.mixer.music.load('audio/alert.wav')

eye_closure_count = 0
total_eye_closure_count = 0
start_time = None

EYE_ASPECT_RATIO_THRESHOLD = 0.3

EYE_ASPECT_RATIO_CONSEC_FRAMES = 30

COUNTER = 0

face_cascade = cv2.CascadeClassifier("classifiers/haarcascade_frontalface_default.xml")

def eye_aspect_ratio(eye):
    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])

    ear = (A+B) / (2*C)
    return ear

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('model/model.dat')

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS['left_eye']
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS['right_eye']

video_capture = cv2.VideoCapture(0)

time.sleep(2)

while(True):
    ret, frame = video_capture.read()
    frame = cv2.flip(frame,1)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = detector(gray, 0)

    face_rectangle = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in face_rectangle:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

    for face in faces:

        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)

        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]

        leftEyeAspectRatio = eye_aspect_ratio(leftEye)
        rightEyeAspectRatio = eye_aspect_ratio(rightEye)

        eyeAspectRatio = (leftEyeAspectRatio + rightEyeAspectRatio) / 2

        leftEyeHull = cv2.convexHull(leftEye)
        rightEyeHull = cv2.convexHull(rightEye)
        cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

        if(eyeAspectRatio < EYE_ASPECT_RATIO_THRESHOLD):
            COUNTER += 1
            if COUNTER >= EYE_ASPECT_RATIO_CONSEC_FRAMES:
                pygame.mixer.music.play(-1)
                cv2.putText(frame, "You are Drowsy", (150,200), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,255), 2)
                eye_closure_count += 1
                if start_time is None:
                    start_time = time.time()
                     # Capture and save image when drowsiness is detected
                if not os.path.exists('output'):
                    os.makedirs('output')
                
                # Save the current frame as img.jpeg in the output folder
                cv2.imwrite("output/img.jpeg", frame)

                # Send an email with the captured image attached
                mail("Drowsiness Detected! See the attached image.")
                mail("With Drowsy")

                # Send SMS Alert
                send_sms_alert()
        else:
            pygame.mixer.music.stop()
            COUNTER = 0
            if start_time is not None: 
                duration = time.time() - start_time
                total_eye_closure_count += duration
                start_time = None  
    cv2.putText(frame, f"Total Eye Closures Time: {total_eye_closure_count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            

    cv2.imshow('Video', frame)
    if(cv2.waitKey(1) & 0xFF == ord('q')):
        break

video_capture.release()
cv2.destroyAllWindows()
