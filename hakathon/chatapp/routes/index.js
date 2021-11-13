'use strict';
const express = require('express');
const router = express.Router();
var user_list = {};
var count = 0;
// ログイン画面の表示
router.get('/', function (request, response, next) {
    response.render('index');
});

router.get('/delete', function (request, response, next) {
    let name = request.query.username;
    delete user_list[name];
    response.redirect('/');
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    user_list[request.body.userName] = request.body.room;
    // user_list.push(request.body.userName);
    response.render('room', {
        userName: request.body.userName,
        room: request.body.room,
        user_list: user_list,
    });
});

router.post('/room/room1', function (request, response, next) {
    console.log(request.body.userName + 'がroom1に移動しました。');
    response.render('room1', { userName: request.body.userName });
});

module.exports = router;