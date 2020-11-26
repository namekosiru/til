'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $("#userName");
    const flag = document.getElementById('message');

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

    // 入力されたメッセージを取得
    const message = $("#message");

    if (message.val()) {
        $('#thread').prepend('<p class="right_name">' + userName.val() + + "さんのメモ" + '</p>' + '<div class="right">' + '<p class="right_text">' + message.val() + "</p>" + "</br>" + '<p class="right_time">' + displayTime + '</p>' + '</div>');
        flag.value = "";
    } else {
        alert("投稿内容を入力して下さい．");
    }
    return false;
}