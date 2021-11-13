'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $("#userName").val();
    // ユーザ名が未入力でないかチェックする
    if (userName === '') {
        alert("ユーザ名を入力してください．");
        return 1;
    }
    const roomName = $('#rooms').val();
    console.log(roomName)
    $('form').submit();
}