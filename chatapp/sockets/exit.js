'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('exit', function (data) {
        console.log(data+"が退出しました");
        socket.broadcast.emit("exit_msg", data);
    });
};
