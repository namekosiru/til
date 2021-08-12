#include <M5Stack.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <time.h>
#include <string.h>

#define JST     3600* 9

const char* ssid = "HG8045-FB6B-bg";
const char* password = "98idvj93";
static const char *wd[7] = {"Sun","Mon","Tue","Wed","Thr","Fri","Sat"};

time_t t;
struct tm *tm;
int menu_index;
bool firstMenuflag;
int secondMenuindex;
int thirdMenuindex;
String buf;
char *dep_name;
char *busstop_name;
char *holi_name;

char *lis1[] =  {
    "To",
    "weekday",
    "Kitaikoma",
    "06",
    "38",
    "07",
    "02",
    "07",
    "22",
    "07",
    "30",
    "07",
    "54",
    "08",
    "05",
    "08",
    "10",
    "08",
    "29",
    "08",
    "38",
    "08","50",
    "09","01",
    "09","48",
    "10","48",
    "11","48",
    "12","48",
    "13","48",
    "14","48",
    "15","48",
    "16","48",
    "17","03",
    "17","31",
    "18","01",
    "18","16",
    "18","46",
    "19","01",
    "19","47",
    "20","13",
    "20","40"
};

char *lis2[] ={
    "To",
    "weekday",
    "Gakuemmae",
    "07","06",
    "07","36",
    "07","54",
    "08","32",
    "08","43",
    "09","26",
    "10","26",
    "11","26",
    "12","26",
    "13","26",
    "14","26",
    "15","26",
    "16","26",
    "16","41",
    "17","39",
    "17","54",
    "18","24",
    "19","25"
};

char *lis3[] ={
    "To",
    "weekday",
    "Takanohara",
    "05","45",
    "06","47",
    "07","54",
    "08","40",
    "09","39",
    "11","03",
    "13","03",
    "14","37",
    "16","19",
    "17","01",
    "18","19",
    "19","06",
    "20","16"
};

char *lis4[] ={
    "From",
    "weekday",
    "Kitaikoma",
    "06","16",
    "06","53",
    "07","18",
    "07","39",
    "07","44",
    "08","08",
    "08","19",
    "08","24",
    "08","51",
    "09","17",
    "10","02",
    "11","02",
    "12","02",
    "13","02",
    "14","02",
    "15","17",
    "16","02",
    "17","07",
    "17","17",
    "17","43",
    "17","57",
    "18","13",
    "18","24",
    "18","37",
    "18","49",
    "19","08",
    "19","22",
    "19","44",
    "20","06",
    "20","29",
    "20","59",
    "21","32",
    "22","02"
};

char *lis5[] ={
    "From",
    "weekend",
    "Kitaikoma",
    "06","16",
    "06","45",
    "07","34",
    "07","58",
    "08","24",
    "08","49",
    "09","17",
    "11","02",
    "13","02",
    "15","17",
    "17","03",
    "17","17",
    "17","47",
    "18","15",
    "18","31",
    "18","57",
    "19","27",
    "19","56",
    "20","27",
    "20","52",
    "21","27"
};

void setup() {
  M5.begin();
  M5.Lcd.clear(WHITE);
  M5.Lcd.drawJpgFile(SD, "/a.jpg", 40,0);
  delay(1000);
  firstMenuflag = true;
  secondMenuindex = 0;
  thirdMenuindex  = 0;
//  menu_index = depature(firstMenuflag);
  Serial.begin(9600);
  delay(100);
  Serial.print("\n\nStart\n");
  int cnt = 0;
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(500);
    cnt += 1;
    if (cnt > 10){
      ESP.restart();
    }
  }
  Serial.println();
  Serial.printf("Connected, IP address :");
  Serial.println(WiFi.localIP());

  configTime( JST, 0, "ntp.nict.jp", "ntp.jst.mfeed.ad.jp");
    
}

void loop() {
  M5.update();

  t = time(NULL);
  tm = localtime(&t);
  Serial.printf(" %04d/%02d/%02d(%s) %02d:%02d:%02d\n",
        tm->tm_year+1900, tm->tm_mon+1, tm->tm_mday,
        wd[tm->tm_wday],
        tm->tm_hour, tm->tm_min, tm->tm_sec);
  if(menu_index == 0 && M5.BtnA.wasPressed())
  {
    firstMenuflag = !firstMenuflag;
  }else if(menu_index == 1 && M5.BtnA.wasPressed())
  {
    secondMenuindex = secondMenuindex + 1;
    secondMenuindex = secondMenuindex % 3;
  }else if(menu_index == 2 && M5.BtnA.wasPressed())
  {
    thirdMenuindex = thirdMenuindex + 1;
    thirdMenuindex = thirdMenuindex % 2;
  }

  if(M5.BtnC.wasReleased() && menu_index >= 1)
  {
    menu_index = menu_index - 1;
  }
  delay(200);

  switch(menu_index){
    case 0:
      menu_index = depature(firstMenuflag);
      break;
    case 1:
      menu_index = busstop(secondMenuindex);
      break;
    case 2:
      menu_index = holiday(thirdMenuindex);
      break;
    default:
      outputpage();
     
  }
}

int depature(bool menuflag){
    M5.Lcd.clear(WHITE);
    M5.Lcd.setTextSize(4);
    M5.Lcd.setTextColor(BLACK);
    M5.Lcd.setCursor(60,20);
    M5.Lcd.printf("departure");
    M5.Lcd.setCursor(40,200);
    M5.Lcd.setTextSize(3);
    M5.Lcd.printf("Time: %02d:%02d:%02d\n",tm->tm_hour, tm->tm_min, tm->tm_sec);
  if(menuflag)
  {
    M5.Lcd.setCursor(20,150);
    M5.Lcd.printf("From");
  }else
  { 
    M5.Lcd.setCursor(250,150);
    M5.Lcd.printf("To");  
  }

  if (M5.BtnB.wasReleased())
  {

    if(menuflag)
    {
      dep_name = "From";
    }else
    {
      dep_name = "To";
    }
    return 1;
  }
  return 0;
}

int busstop(int menuindex){
    M5.Lcd.clear(WHITE);
    M5.Lcd.setTextSize(5);
    M5.Lcd.setTextColor(BLACK);
    
    M5.Lcd.setCursor(60,20);
    M5.Lcd.printf("busstop");
    M5.Lcd.setCursor(40,200);
    M5.Lcd.setTextSize(3);
    M5.Lcd.printf("Time: %02d:%02d:%02d\n",tm->tm_hour, tm->tm_min, tm->tm_sec);
    M5.Lcd.setTextSize(4);
  if(menuindex == 0)
  {
    M5.Lcd.setCursor(20,70);
    M5.Lcd.printf("Kitaikoma");
  }else if(menuindex==1)
  { 
    M5.Lcd.setCursor(20,120);
    M5.Lcd.printf("Gakuemmae");
  }else
  {
    M5.Lcd.setCursor(20,170);
    M5.Lcd.printf("Takanohara");
  }

  if (M5.BtnB.wasReleased())
  {
    if(menuindex==0)
    {
      busstop_name = "Kitaikoma";
    }else if(menu_index==1)
    {
      busstop_name = "Gakuenmae";
    }else
    {
      busstop_name = "Takanohara";
    }
    return 2;
  }
  return 1;  
}

int holiday(int menuflag){
    M5.Lcd.clear(WHITE);
    M5.Lcd.setTextSize(4);
    M5.Lcd.setTextColor(BLACK);
    M5.Lcd.setCursor(10,20);
    M5.Lcd.printf("Rest or Work");
    M5.Lcd.setCursor(40,200);
    M5.Lcd.setTextSize(3);
    M5.Lcd.printf("Time: %02d:%02d:%02d\n",tm->tm_hour, tm->tm_min, tm->tm_sec);
  if(menuflag == 0)
  {
    M5.Lcd.setCursor(20,150);
    M5.Lcd.printf("weekend");
  }else
  { 
    M5.Lcd.setCursor(180,150);
    M5.Lcd.printf("weekday");  
  }

  if (M5.BtnB.wasReleased())
  {
    if(menuflag==0)
    {
      holi_name = "weekend";
    }
    else
    {
      holi_name = "weekday";
    }
    return 3;
  }
  return 2;
}

void outputpage(){
    M5.Lcd.clear(WHITE);
    M5.Lcd.setCursor(40,200);
    M5.Lcd.setTextSize(3);
    M5.Lcd.printf("Time: %02d:%02d:%02d\n",tm->tm_hour, tm->tm_min, tm->tm_sec);
    M5.Lcd.setTextSize(3);
    M5.Lcd.setTextColor(BLACK);
    M5.Lcd.setCursor(0,20);
    M5.Lcd.println(dep_name);
    M5.Lcd.println(busstop_name);
    M5.Lcd.println(holi_name);
    M5.Lcd.setCursor(40,150);

    
    char *lis1_dep = lis1[0];
    char *lis1_day = lis1[1];
    char *lis1_bus = lis1[2];

    char *lis2_dep = lis2[0];
    char *lis2_day = lis2[1];
    char *lis2_bus = lis2[2];
    
    char *lis3_dep = lis3[0];
    char *lis3_day = lis3[1];
    char *lis3_bus = lis3[2];
    
    char *lis4_dep = lis4[0];
    char *lis4_day = lis4[1];
    char *lis4_bus = lis4[2];
    
    char *lis5_dep = lis5[0];
    char *lis5_day = lis5[1];
    char *lis5_bus = lis5[2];
    
    if (dep_name == lis1_dep && busstop_name == lis1_bus && holi_name == lis2_day){
      Serial.printf("1");
      M5.Lcd.println("14:48");
    }else if(dep_name == lis2_dep && busstop_name == lis2_bus && holi_name == lis2_day){
      M5.Lcd.println("16:41");
      Serial.printf("2");
    }else if(dep_name == lis3_dep && busstop_name == lis3_bus && holi_name == lis3_day){
      M5.Lcd.println("16:19");
      Serial.printf("3");
    }else if(dep_name == lis4_dep && busstop_name == lis4_bus && holi_name == lis4_day){
      M5.Lcd.println("16:02");
      Serial.printf("4");
    }else{
      M5.Lcd.println("17:03");
      Serial.printf("5");
      Serial.printf(busstop_name);
      Serial.printf(lis1_bus);
    }
    
}
