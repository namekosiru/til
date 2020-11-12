'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = '';
    // 入力されたメッセージを取得
    const message = document.getElementById('message');

    if (message.value === '') {
        return console.log('return起動');
    }

    // 投稿内容を送信
<<<<<<< HEAD
    
=======
    socket.emit('sendPostServer', {
        name: 'name',
        text: message.value
    });

    //入力欄を空白にする
    message.value = '';

>>>>>>> 848474bc27b0c6eace158f5c457a0b9df4b7554b
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('sendPostCliant', function (data) {
    $('#thread').prepend('<p>' + data.name + ':' + data.text + '</p>');
});
