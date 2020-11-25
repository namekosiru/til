'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
        console.log(data.userlist);
        var user_list = data.userlist;
        const delete_id = String(data.userid);
        const delete_user = data.userName;
        delete user_list[delete_id];
        console.log(user_list);
        socket.broadcast.emit("exit_msg", {userlist:user_list,msg:data.msg});
    });
};
