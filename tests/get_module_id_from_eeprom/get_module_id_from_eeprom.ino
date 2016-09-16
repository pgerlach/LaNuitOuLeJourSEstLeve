#include <EEPROM.h>

struct s_module_eeprom_data {
  byte magic = 0x42; // MUST be 0x42
  char id[5];  // 0 terminated string
} eepromData;

void setup() {
  Serial.begin(115200);

  memset(&eepromData, 0, sizeof(eepromData));
  EEPROM.get(0, eepromData);
  if (eepromData.magic != 0x42) {
    Serial.println("bad magic");
    Serial.println(eepromData.magic);
    return ;
  }
  Serial.print("module id: "); Serial.println(eepromData.id);
}

void loop() {
  // put your main code here, to run repeatedly:

}
