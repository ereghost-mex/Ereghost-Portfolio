#include <I2S.h>

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <SinricPro.h>
#include <SinricProSwitch.h>
ESP8266WiFiMulti wifiMulti;

#define WIFI_SSID1 "YOUR_WIFI_NAME"
#define WIFI_PASS1 "YOUR_WIFI_PASS"
#define WIFI_SSID2 "~" //another wifi configuration incase of unavailableity of first wifi
#define WIFI_SSID2 "~" //another wifi configuration incase of unavailableity of first wifi

#define APP_KEY     "417fac4c-fd9d-4e0b-8676-f68fbe0dda54"
#define APP_SECRET  "ffc08a7e-32a0-4a6e-abb1-9dbf59303bff-87fc6bc4-5516-4693-9226-a0a5ef00888a"
#define DEVICE_ID   "69b6c76fdafb005af4d566bd"

#define RELAY_PIN D2

bool onPowerState(const String &deviceId, bool &state) {
  digitalWrite(RELAY_PIN, state ? LOW : HIGH);
  Serial.printf("Device %s turned %s\r\n", deviceId.c_str(), state ? "ON" : "OFF");
  return true;
}

void setupWiFi() {
//  Serial.printf("Connecting to %s", WIFI_SSID);

  wifiMulti.addAP("Sakshat", "Sakshat@372007");
  wifiMulti.addAP("snetin", "7004776659");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("Connected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

void setupSinricPro() {
  SinricProSwitch &mySwitch = SinricPro[DEVICE_ID];

  mySwitch.onPowerState(onPowerState);

  SinricPro.begin(APP_KEY, APP_SECRET);
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  setupWiFi();
  setupSinricPro();
}

void loop() {
  SinricPro.handle();
}