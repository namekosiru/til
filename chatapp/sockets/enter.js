'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('send', function (data) {
        io.sockets.emit("send", data);
    });
};
