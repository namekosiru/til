'use strict';
// 退室メッセージをサーバに送信する
function exit() {
    //users_listの個々の要素を取り出し
    const users_name = document.getElementsByClassName("users");
    const users_room = document.getElementsByClassName("rooms");
    var li = {};

    //roomを取得
    const room = $('#room').val();

    //新しくusersの情報配列を作成
    for (let i = 0; i < users_name.length; i++) {
        li[users_room.item(i).value] = users_name.item(i).value;
    }
    console.log(li);
    const userName = $("#userName").val();
    const userid = $("#userid").val();
    // 退室メッセージイベントを送信する
    socket.emit("exit", {userlist:li,userid:userid,userName:userName,msg:userName+"が退出しました."});

    // 退室
    // location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit_msg', function (data) {

    $('#thread').prepend('<p class="enter_message">' + data.msg +'</p>');

    var user_list = {}
    console.log(data.userlist);
    // console.log(data.user_list[0]);
    for (const [key, value] of Object.entries(data.userlist)) {
        user_list[key] = value;
    }
    //日時取得
    console.log(user_list);
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
    const value = '{{#each user_list}}<li><input type="hidden" class="users" value={{this}} name="name">{{this}}{{@key}}</li>{{/each}}'
    var template = Handlebars.compile(value);
    $("#user").html(template({ user_list: user_list }));
    module.exports = user_list;
    $('#thread').prepend('<p>' + data.msg + " " + displayTime + '</p>');
});