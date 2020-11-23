'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
const message = userName + 'さんが入室しました．';
socket.emit('sendEnterMessageEvent', message);
// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterMessageEvent', function (data) {
  switch (prop) {
    case 'room1':
      $('#thread1').prepend('<p>' + data + '</p>');
      break;
    case 'room':
      $('#thread').prepend('<p>' + data + '</p>');
      console.log('roomです')
      break;
    default:
      console.log('読み取れません')
      break;
  }
});

// サーバから受信したソケットIDを値としてしまう
socket.on('onConnect', function (socket_id) {
  const my_socket_id = socket_id;
  const new_my_socket_id = JSON.stringify(my_socket_id);
  $("#socket_id").val(new_my_socket_id);
});
