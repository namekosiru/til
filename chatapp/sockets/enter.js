'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterMessageEvent', function (data) {
      socket.broadcast.emit('receiveEnterMessageEvent', data);
    });
};