'use strict';
// 退室メッセージをサーバに送信する
function exit() {
    //users_listの個々の要素を取り出し
    const users_list = document.getElementsByClassName("users");
    var li = {};
    //新しくusersの情報配列を作成
    for(let i=0;i<users_list.length;i++){
        li[i+1] = users_list.item(i).value;
    }
    const userName = $("#userName").val();
    const userid = $("#userid").val();
    // 退室メッセージイベントを送信する
    socket.emit("exit", [li,userid,userName,userName+"さんが退出しました."]);

    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit_msg', function (data) {
<<<<<<< HEAD
    console.log(data[0]);
    $('#thread').prepend('<p>' + data[1] +'</p>');
    $("#user").append('{{#each user_list}}');
    // $("#user").html('{{#each user_list}}"<li><input type="hidden" class="users" value={{this}} name="name">{{this}}</li>"{{/each}}');
});
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

