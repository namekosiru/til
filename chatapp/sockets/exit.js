'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
        console.log(data.userlist);
        var user_list = data.userlist;
        const delete_user = data.userName;

        user_list = user_list.filter(function(value){
            return value !== delete_user;
        })
        console.log("###########");
        console.log(user_list);
        socket.broadcast.emit("exit_msg", {userlist:user_list,msg:data.msg});

    });
};
