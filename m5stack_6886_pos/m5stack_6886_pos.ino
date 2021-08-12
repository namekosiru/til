// <M5Stack.h>をincludeする前に、IMUモジュールを#defineしておく
// この記事で使用するのは、M5Stack FireでIMUはMPU6886を使っているのでMPU6886を#defineしておく
#define M5STACK_MPU6886 
//#define M5STACK_MPU9250 
//#define M5STACK_MPU6050
// #define M5STACK_200Q

#include <M5Stack.h>

#define RAD_TO_DEG 57.324

float accX, accY, accZ;
float gyroX, gyroY, gyroZ;
float pitch, roll, yaw;
float my_pitch, my_roll, my_yaw;
float Temp;


void setup(){
  M5.begin();
  M5.Power.begin();
    
  M5.IMU.Init();

  M5.Lcd.fillScreen(BLACK);
  M5.Lcd.setTextColor(GREEN , BLACK);
  M5.Lcd.setTextSize(2);
}

void loop() {
  //ジャイロ
  M5.IMU.getGyroData(&gyroX,&gyroY,&gyroZ);
  M5.Lcd.setCursor(0, 0);
  M5.Lcd.printf("gyro=(%5.1f, %5.1f, %5.1f)", gyroX, gyroY, gyroZ); 
  //加速度
  M5.IMU.getAccelData(&accX,&accY,&accZ);
  M5.Lcd.setCursor(0, 50);
  M5.Lcd.printf("acc=(%5.1f, %5.1f, %5.1f)", accX, accY, accZ); 

  //M5stackの標準関数で実施
  M5.IMU.getAhrsData(&pitch,&roll,&yaw);
  M5.Lcd.setCursor(0, 100);
  //PRY(姿勢角)= ピッチ、ロー、ヨー
  M5.Lcd.printf("PRY=(%5.1f, %5.1f, %5.1f)", pitch, roll, yaw);

  //reference = https://myenigma.hatenablog.com/entry/2015/11/09/183738　
//  float my_roll = atan(accY / accZ) * RAD_TO_DEG;
//  float my_pitch = atan(-accX / sqrtf(accY*accY + accZ*accZ)) * RAD_TO_DEG;
//  M5.Lcd.setCursor(0, 150);
//  M5.Lcd.printf("pitch = %5.1f, roll = %5.1f", my_pitch, my_roll); //同じく姿勢角だが、こちらはM5stackの標準関数ではないものを使用(併記URL参照)


  M5.IMU.getTempData(&Temp);
  M5.Lcd.setCursor(0, 200);
  M5.Lcd.printf("Temperature=%.2f C", Temp);
  
  delay(1);
}
