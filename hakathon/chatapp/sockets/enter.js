'use strict';

module.exports = function (socket) {
  socket.on('joinRoom', (data) => {
    socket.join(data);
    console.log(data + 'に参加しました');
  })
  socket.on('sendEnterMessageEvent', function (data) {
    // ソケットIDをクライアントに送信する
      socket.emit("onConnect", {
        socket_id: socket.id
      });
      // 入室メッセージをクライアントに送信する
      console.log(data);
      socket.broadcast.emit('receiveEnterMessageEvent', data);
    });
};