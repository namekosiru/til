'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
<<<<<<< Updated upstream
const userName = 'neko';
// 入室メッセージイベントを送信する

// サーバから受信した入室メッセージを画面上に表示する
socket.on('', function (data) {
    $('#thread').prepend('<p>' + data+ '</p>');
});
=======
const userName = $('#userName').val();
// 入室メッセージイベントを送信する
  const message = userName + 'さんが入室しました．';
  socket.emit('sendEnterMessageEvent', message);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data +'</p>');
});
>>>>>>> Stashed changes
