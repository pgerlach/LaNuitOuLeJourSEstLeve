#include <SPI.h>
#include "RF24.h"
#include <printf.h>

#define PIN_NRF24L01_CS (9)
#define PIN_NRF24L01_CE (8)

RF24 radio(PIN_NRF24L01_CE,PIN_NRF24L01_CS);
/**********************************************************/

void setup() {
  Serial.begin(115200);
  printf_begin();
  radio.begin();
  radio.setChannel(0x1f);
  Serial.println("NRF24L01 TEST MODE");
  radio.printDetails();
  Serial.println("DONE");
}

void loop() {
  ;
} // Loop

