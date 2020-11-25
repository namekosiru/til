'use strict';
// 退室メッセージをサーバに送信する
function exit() {
    //users_listの個々の要素を取り出し
    const users_list = document.getElementsByClassName("users");
    var li = {};

    //roomを取得
    const room = $('#room').val();

    //新しくusersの情報配列を作成
    for (let i = 0; i < users_list.length; i++) {
        li[i + 1] = users_list.item(i).value;
    }
    const userName = $("#userName").val();
    const userid = $("#userid").val();
    // 退室メッセージイベントを送信する
    socket.emit("exit", [li, userid, userName, userName + "さんが退出しました.", room]);

    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('exit_msg', function (data) {

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

    var user_list = {}
    for (const keys of Object.keys(data[0])) {
        user_list[keys] = data[0][keys];
    }
    console.log(user_list);
    const value = '{{#each user_list}}<li><input type="hidden" class="users" value={{this}} name="name">{{this}}</li>{{/each}}'
    var template = Handlebars.compile(value);
    $("#user").html(template({ user_list: user_list }));
    $('#thread').prepend('<p>' + data[1] + " " + displayTime + '</p>');
});


