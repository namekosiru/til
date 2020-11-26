'use strict';
// 退室メッセージをサーバに送信する
function exit() {
    //users_listの個々の要素を取り出し
    const users_list = document.getElementsByClassName("users");
    var li = [];

    //roomを取得
    const room = $('#room').val();

    //新しくusersの情報配列を作成
    for (let i = 0; i < users_list.length; i++) {
        li.push(users_list.item(i).value);
    }
    const userName = $("#userName").val();
    const userid = $("#userid").val();
    // 退室メッセージイベントを送信する
    socket.emit("exit", {userlist:li,userid:userid,userName:userName,msg:userName+"さんが退出しました."});

    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit_msg', function (data) {

    $('#thread').prepend('<p>' + data.msg +'</p>');

    var user_list = []
    for(let i=0;i<data.user_list.length;i++){
        user_list.push(data.user_list[i]);
    }
    // for(const keys of Object.keys(data.userlist)){
    //     user_list[keys] = data.userlist[keys];
    // }
    console.log(user_list);
    const value = '{{#each user_list}}<li><input type="hidden" class="users" value={{this}} name="name">{{this}}</li>{{/each}}'
    var template = Handlebars.compile(value);
    $("#user").html(template({ user_list: user_list }));
    module.exports = user_list;
});


