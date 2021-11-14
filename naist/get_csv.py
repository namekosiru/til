# -*- coding: utf-8 -*-
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
 

URL = "https://naist.arosh.dev/"

options = Options()
# ヘッドレスモードで実行する場合
options.add_argument("--headless")
driver = webdriver.Chrome(options=options, executable_path="C:\\Users\\riku\\AppData\\Local\\Programs\\Python\\Python39\\Lib\\site-packages\\chromedriver_binary\\chromedriver.exe")

driver.get(URL)

html = driver.page_source
soup = BeautifulSoup(html, "html.parser")
# to_from = [values.text for values in soup.select("#direction option")]
# bus_stops = [values.text for values in soup.select("#busStop option")]
# day_holy = [values.text for values in soup.select("#scheduleType option")]

direction_selector = Select(driver.find_element_by_id("direction"))
busstop_selector = Select(driver.find_element_by_id("busStop"))
timetable_selector = Select(driver.find_element_by_id("scheduleType"))

directions = direction_selector.options
timetables = timetable_selector.options
busstops = busstop_selector.options

json_obj = []

for direction_index in range(2):
    direction_selector.select_by_index(direction_index)
    direction_name = directions[direction_index].text
    for timetable_index in range(2):
        timetable_selector.select_by_index(timetable_index)
        timetable_name = timetables[timetable_index].text
        for bus_index in range(4):
            tmp = []
            busstop_selector.select_by_index(bus_index)
            busstop_name = busstops[bus_index].text
            tmp.append(direction_name)
            tmp.append(timetable_name)
            tmp.append(busstop_name)
            times = driver.find_element_by_class_name("time-table-js").text.split("\n")
            #時刻表の削除
            times.pop(0)
            #時間表の名前
            time_name = times.pop(0)
            times_list = []
            time_list = []
            for content in times:
                if "−" in content:
                    # time_list.append(times_list)
                    # times_list = []
                    # time_name = content
                    continue
                else:
                    tmp.append(content)
            # time_list.append(times_list)
            # tmp.append(times_list)
            json_obj.append(tmp)
json.dumps(json_obj, ensure_ascii=False)
with open('data1.json', mode='wt', encoding='utf-8') as file:
  json.dump(json_obj, file, ensure_ascii=False, indent=2)
                            
   
    


            

driver.quit()