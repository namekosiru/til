'use strict';

module.exports = function (socket) {
  socket.on('sendEnterMessageEvent', function (data) {
    // ソケットIDをクライアントに送信する
      socket.emit("onConnect", {
        socket_id: socket.id
      });
      // 入室メッセージをクライアントに送信する
      socket.broadcast.emit('receiveEnterMessageEvent', data);
    });
    // socket.on("username",function(data){
    //   user_list.unshift(data);
    //   console.log(user_list);
    //   import.sockets.emit("username_list",user_list)
    // });
};