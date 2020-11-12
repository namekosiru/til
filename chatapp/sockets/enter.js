'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
<<<<<<< Updated upstream
    socket.on('send', function (data) {
        io.sockets.emit("send", data);
=======
    socket.on('sendEnterMessageEvent', function (data) {
      socket.broadcast.emit('receiveEnterMessageEvent', data);
>>>>>>> Stashed changes
    });
};