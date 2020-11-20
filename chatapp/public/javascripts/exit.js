'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $("#userName").val();
    // 退室メッセージイベントを送信する
    socket.emit("exit", userName + "さんが退出しました.");
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit_msg', function (data) {
    switch (prop) {
        case 'room1':
            $('#thread1').prepend('<p>' + data + '</p>');
            break;
        case 'room':
            $('#thread').prepend('<p>' + data + '</p>');
            break;
        default:
            console.log('読み取れません')
            break;
    }
});