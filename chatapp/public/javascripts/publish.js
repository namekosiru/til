'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();

    // 入力されたメッセージを取得
    const message = document.getElementById('message');

    if (message.value.trim() === '') {
        return console.log('return起動');
    }

    const createdAt = new Date();
    const month = createdAt.getMonth() + 1;
    const today = createdAt.getDate();
    const hours = createdAt.getHours();
    let minutes = createdAt.getMinutes();
    console.log(String(minutes));
    if (String(minutes) === 1) {
        minutes = Number("0" + "minutes")
    }
    const displayTime = (month + "/" + today + " " + hours + ":" + minutes);

    // 投稿内容を送信
    socket.emit('sendPostServer', {
        name: userName + "さん",
        text: message.value,
        time: displayTime
    });

    //入力欄を空白にする
    message.value = '';
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('sendPostCliant', function (data) {
    $('#thread').prepend('<p>' + data.name + '：' + data.text + "　" + data.time + '</p>');
});
