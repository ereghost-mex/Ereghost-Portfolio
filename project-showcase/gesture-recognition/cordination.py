import cv2
import mediapipe as mp
import pyautogui
import numpy as np

# Screen size
screen_w, screen_h = pyautogui.size()

# Initialize MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1)
mp_draw = mp.solutions.drawing_utils

# Use DroidCam (try 0, 1, or 2)
cap = cv2.VideoCapture(0)

# Smoothing variables
prev_x, prev_y = 0, 0

while True:
    success, img = cap.read()
    if not success:
        break

    img = cv2.flip(img, 1)
    h, w, _ = img.shape

    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)

    if result.multi_hand_landmarks:
        for hand in result.multi_hand_landmarks:
            lm_list = []

            for id, lm in enumerate(hand.landmark):
                cx, cy = int(lm.x * w), int(lm.y * h)
                lm_list.append((id, cx, cy))

            if lm_list:
                # Index finger tip (id 8)
                x1, y1 = lm_list[8][1:]

                # Convert to screen coordinates
                screen_x = np.interp(x1, [0, w], [0, screen_w])
                screen_y = np.interp(y1, [0, h], [0, screen_h])

                # Smooth movement
                curr_x = prev_x + (screen_x - prev_x) / 5
                curr_y = prev_y + (screen_y - prev_y) / 5

                pyautogui.moveTo(curr_x, curr_y)
                prev_x, prev_y = curr_x, curr_y

                # Middle finger tip (id 12)
                x2, y2 = lm_list[12][1:]

                # Distance between fingers
                distance = np.hypot(x2 - x1, y2 - y1)

                # Click gesture
                if distance < 30:
                    pyautogui.click()
                    pyautogui.sleep(0.2)

            # Draw hand landmarks
            mp_draw.draw_landmarks(img, hand, mp_hands.HAND_CONNECTIONS)

    cv2.imshow("Hand Mouse Control", img)

    # Press ESC to exit
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()