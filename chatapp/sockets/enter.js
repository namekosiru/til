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
    socket.broadcast.to(data[1]).emit('receiveEnterMessageEvent', data[0]);
  });
  // socket.on("username",function(data){
  //   user_list.unshift(data);
  //   console.log(user_list);
  //   import.sockets.emit("username_list",user_list)
  // });
};