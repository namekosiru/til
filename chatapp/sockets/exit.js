'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
        console.log(data[0]);
        var user_list = data[0];
        const delete_id = String(data[1]);
        const delete_user = data[2];
        delete user_list[delete_id];
        socket.broadcast.emit("exit_msg", [user_list,data[3]]);
    });
};
