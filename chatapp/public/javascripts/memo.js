'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $("#userName");
    const flag = document.getElementById('message');
    // 入力されたメッセージを取得
    const message = $("#message");
    if (message.val()) {
        $('#thread').prepend('<p class="right">' + userName.val() + "さんのメモ：" + message.val() + '</p>');
        flag.value = "";
    } else {
        alert("投稿内容を入力して下さい．");
    }
    return false;
}