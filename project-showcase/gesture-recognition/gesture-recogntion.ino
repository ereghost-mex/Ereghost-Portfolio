int ledPins[] = {8, 9, 10, 11, 12};  // Thumb, Index, Middle, Ring, Pinky

void setup() {
  Serial.begin(9600);

  for (int i = 0; i < 5; i++) {
    pinMode(ledPins[i], OUTPUT);
  }
}

void loop() {
  if (Serial.available() >= 5) {  // Wait for 5 bytes
    for (int i = 0; i < 5; i++) {
      int fingerState = Serial.read();

      if (fingerState == 1) {
        digitalWrite(ledPins[i], HIGH);
      } else {
        digitalWrite(ledPins[i], LOW);
      }
    }
  }
}