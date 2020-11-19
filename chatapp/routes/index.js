'use strict';

const express = require('express');
const router = express.Router();
var user_list = []

// ログイン画面の表示
router.get('/', function(request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function(request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    //userlistの作成
    user_list.unshift(request.body.userName);
    console.log(user_list);
    response.render('room', { userName: request.body.userName,});
});

module.exports = router;
