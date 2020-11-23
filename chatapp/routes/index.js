'use strict';

const express = require('express');
const router = express.Router();
var flag = false;
var user_list = {};
var count = 0;
// ログイン画面の表示
router.get('/', function (request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    //userlistの作成
    count += 1;
    user_list[count] = request.body.userName;
    console.log(user_list);
    flag = true;
    response.render('room', { userName: request.body.userName, user_list:user_list,userid:count,flag:flag});
});

router.post('/room/room1', function (request, response, next) {
    console.log(request.body.userName + 'がroom1に移動しました。');
    response.render('room1', { userName: request.body.userName });
});

module.exports = router;
