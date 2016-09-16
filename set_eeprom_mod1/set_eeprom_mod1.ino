#include <EEPROM.h>

#define ID "mod1"

typedef struct s_module_eeprom_data {
  byte magic = 0x42; // MUST be 0x42
  char id[5] = ID;  // 0 terminated string
} t_module_eeprom_data;

t_module_eeprom_data eepromDataToWrite;
t_module_eeprom_data eepromDataRead;

void setup() {
  Serial.begin(115200);

  // write
  strcpy(eepromDataToWrite.id, ID);
  EEPROM.put(0, eepromDataToWrite);

  // check
  memset(&eepromDataRead, 0, sizeof(eepromDataRead));
  eepromDataRead.magic = 0x00;
  EEPROM.get(0, eepromDataRead);
  if (eepromDataRead.magic != 0x42 || strcmp(eepromDataRead.magic, ID)) {
    Serial.println("FAILURE");
  } else {
    Serial.println("SUCCESS !");
  }

  // now check
}

void loop() {
  // put your main code here, to run repeatedly:

}
