'use strict';

// const { delete } = require("../routes");

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
        console.log(data.userlist);
        var user_list = data.userlist;
        const delete_user = data.userName;
        delete user_list[delete_user];
        console.log(user_list);
        console.log("###########");
        socket.broadcast.emit("exit_msg", {userlist:user_list,msg:data.msg});

    });
};
