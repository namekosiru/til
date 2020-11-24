'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendPostServer', function (data) {
        io.to(data.room).emit('sendPostCliant', data);
    });
};
