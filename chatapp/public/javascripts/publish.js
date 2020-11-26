'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();

    // ソケットIDを取得
    const my_socket_id = $("#socket_id").val();
    console.log(my_socket_id);

    //送信するRoomを取得
    const room = $('#room').val();

    // 入力されたメッセージを取得
    const message = document.getElementById('message');

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

    if (message.value) {
        socket.emit('sendPostServer', {
            name: userName + "さん",
            text: message.value,
            time: displayTime,
            id: my_socket_id,
            room: room
        });
        message.value = '';
    } else {
        alert("投稿内容を入力して下さい．");
    }
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('sendPostCliant', function (data) {
    // 自分のソケットIDを取得
    const my_socket_id = $("#socket_id").val();

    if (my_socket_id !== data.id) {
        $('#thread').prepend('<p class="left_name">' + data.name + '</p>' + '<div class="left">' + '<p class="left_text">' + data.text + "</p>" + "</br>" + '<p class="left_time">' + data.time + '</p>' + '</div>');
    } else {
        $('#thread').prepend('<p class="right_name">' + data.name + '</p>' + '<div class="right">' + '<p class="right_text">' + data.text + "</p>" + "</br>" + '<p class="right_time">' + data.time + '</p>' + '</div>');
    };
});