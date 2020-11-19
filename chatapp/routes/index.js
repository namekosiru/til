'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function (request, response, next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log(request.body)
    response.render('room', { userName: request.body.userName });
});

router.post('/room/room1', function (request, response, next) {
    console.log(request.body.userName + 'がroom1に移動しました。');
    response.render('room1', { userName: request.body.userName });
});

module.exports = router;
