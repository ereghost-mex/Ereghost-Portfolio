import cv2
import mediapipe as mp
import serial
import time

# 🔌 Connect to Arduino (CHANGE COM PORT if needed)
arduino = serial.Serial('COM3', 9600)
time.sleep(2)

# 🤖 Mediapipe setup
mp_hands = mp.solutions.hands
hands = mp_hands.Hands()
mp_drawing = mp.solutions.drawing_utils

# ✋ Finger detection function
def detect_fingers(hand_landmarks):
    finger_tips = [8, 12, 16, 20]
    thumb_tip = 4

    finger_states = [0, 0, 0, 0, 0]  # Thumb, Index, Middle, Ring, Pinky

    # 👍 Thumb (FIXED for mirrored camera)
    if hand_landmarks.landmark[thumb_tip].x > hand_landmarks.landmark[thumb_tip - 1].x:
        finger_states[0] = 1

    # ✋ Other fingers
    for i, tip in enumerate(finger_tips):
        if hand_landmarks.landmark[tip].y < hand_landmarks.landmark[tip - 2].y:
            finger_states[i + 1] = 1

    return finger_states


# 🎥 Use DroidCam (CHANGE index if needed: 0 / 1)
cap = cv2.VideoCapture(0)

# Optional: reduce lag
cap.set(3, 640)
cap.set(4, 480)

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("Camera not working")
        break

    # Flip + convert
    image = cv2.flip(frame, 1)
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:

            # Draw hand
            mp_drawing.draw_landmarks(image, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            # Detect fingers
            fingers = detect_fingers(hand_landmarks)

            # Send to Arduino
            arduino.write(bytearray(fingers))
            time.sleep(0.05)  # IMPORTANT for stability

            print("Fingers:", fingers)

    cv2.imshow("Hand Tracking", image)

    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()
arduino.close()