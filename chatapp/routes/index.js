'use strict';
const express = require('express');
const router = express.Router();
var user_list = {};
var count = 0;
// ログイン画面の表示
router.get('/', function (request, response, next) {
    globalThis.name = (request.body.name);
    response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    //userlistの作成
    // const users_list = document.getElementsByClassName("users");
    // console.log(users_list);
    count += 1;
    user_list[count] = request.body.userName;
    console.log(user_list);
    response.render('room', {
        userName: request.body.userName,
        room: request.body.room,
        user_list: user_list,
        userid: count
    });
});

module.exports = router;
