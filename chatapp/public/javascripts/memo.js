'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();
    if(message){
        $('#thread').prepend('<p>' + userName+ "さんのメモ：" + message +'</p>');
        message.value = '';
    }else{
        alert("投稿内容を入力して下さい．");
    }
    return false;
}
