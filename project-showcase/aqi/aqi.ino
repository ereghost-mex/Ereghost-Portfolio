#include <DHT.h>

/* -------- Pin Definitions -------- */
#define GAS_SENSOR A0
#define DHTPIN 2
#define BUZZER 8
#define DHTTYPE DHT11

/* -------- Create DHT Object -------- */
DHT dht(DHTPIN, DHTTYPE);

/* -------- Variables -------- */
int gasLevel = 0;
String quality = "";

/* -------- Gas Sensor Function -------- */
void airSensor() {

  gasLevel = analogRead(GAS_SENSOR);

  if (gasLevel < 151) {
    quality = "GOOD";
  }
  else if (gasLevel < 200) {
    quality = "POOR";
  }
  else if (gasLevel < 300) {
    quality = "VERY BAD";
  }
  else if (gasLevel < 500) {
    quality = "TOXIC";
  }
  else {
    quality = "DANGER";
  }

  /* ---- Print Gas Data ---- */
  Serial.print("Gas Level : ");
  Serial.println(gasLevel);

  Serial.print("Air Quality : ");
  Serial.println(quality);

  /* ---- Buzzer Alert ---- */
  if (gasLevel >= 200) {   // VERY BAD or higher
    tone(BUZZER, 1000);    // Buzzer ON
    delay(500);            // Beep duration
    noTone(BUZZER);        // Buzzer OFF
    delay(500);           // 1 second gap
  }
}

/* -------- DHT Sensor Function -------- */
void readDHT() {

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Temperature : ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidity    : ");
  Serial.print(humidity);
  Serial.println(" %");
}

/* -------- Setup -------- */
void setup() {

  Serial.begin(9600);

  pinMode(GAS_SENSOR, INPUT);
  pinMode(BUZZER, OUTPUT);

  dht.begin();

  Serial.println("Air Quality Monitoring System");
  Serial.println("------------------------------");
}

/* -------- Main Loop -------- */
void loop() {

  airSensor();     // Read gas sensor
  readDHT();       // Read temperature & humidity

  Serial.println("------------------------------");

  delay(2000);     // 2 second interval
}