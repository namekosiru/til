'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();

//入室するRoomを取得
let room = $('#room').val();
console.log(room);
//roomに入室
socket.emit('joinRoom', room);

//日時取得
const createdAt = new Date();
const month = createdAt.getMonth() + 1;
const today = createdAt.getDate();
const hours = createdAt.getHours();
let minutes = createdAt.getMinutes();
if (String(minutes) === 1) {
  minutes = Number("0" + "minutes")
}

//表示させる時刻
const displayTime = (month + "/" + today + " " + hours + ":" + minutes);

// 入室メッセージイベントを送信する
// const message = userName + 'さんが入室しました．';
const message = userName;
socket.emit('sendEnterMessageEvent', [message, room]);
// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterMessageEvent', function (data) {
  console.log(data);
  switch (prop) {
    case 'room1':
      $('#thread1').prepend('<p>' + data[0] + "さんが" + data[1] + "に入室しました" + '</p>');
      $('#user').prepend(`<li><input type="hidden" class="users" value="${data[0]}" name="name">${data[1]} ${data[0]}</li>`);
      break;
    case 'room':
      // console.log(data);
      // $('#thread').prepend('<p>' + data[0] + "さんが入室しました" + '</p>');
      $('#user').prepend(`<li><input type="hidden" class="users" value="${data[0]}" name="name">${data[1]} ${data[0]}</li>`); // <- サーバからきたuserNameを一覧に
      console.log('roomです')
      break;
    default:
      console.log('読み取れません')
      break;
  }
  $('#thread').prepend('<p class="enter_message">' + data[0] + "さんが" + data[1] + "に入室しました" + " " + displayTime + '</p>');
});

// サーバから受信したソケットIDを値としてしまう
socket.on('onConnect', function (socket_id) {
  const my_socket_id = socket_id;
  const new_my_socket_id = JSON.stringify(my_socket_id);
  $("#socket_id").val(new_my_socket_id);
});