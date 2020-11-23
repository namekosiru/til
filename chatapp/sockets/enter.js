'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterMessageEvent', function (data) {
      socket.broadcast.emit('receiveEnterMessageEvent', data);
    });
    // socket.on("username",function(data){
    //   user_list.unshift(data);
    //   console.log(user_list);
    //   import.sockets.emit("username_list",user_list)
    // });
};