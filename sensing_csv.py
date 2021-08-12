import serial
import csv

path = 'action.csv'
f = open(path,mode='w') # ファイルを作成、初期化
f.close()


ser = serial.Serial('COM5',timeout=None)

index=0
data = ser.read_all()
print(data)
# while True:
#     index=index+1
#     # ser.write(bytes("Hello"+str(index)+"\r\n", 'UTF-8')) # メッセージを受信したら返信する

#     line = ser.readline() # 改行コードまでメッセージを読み込む
#     print(line.decode(), end='')

#     with open('action.csv', 'a') as f: # 配列の内容をCSVファイルに1行書き込む
#         writer = csv.writer(f)
#         writer.writerow(line[:-1])

ser.close()
