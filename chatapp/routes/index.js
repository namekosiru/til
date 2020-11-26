'use strict';
const express = require('express');
const router = express.Router();
var user_list = [];
var count = 0;
// ログイン画面の表示
router.get('/', function (request, response, next) {
    response.render('index');
});

router.get('/delete', function (request, response, next) {
    let name = request.query["username"];
    console.log(response.query["username"]);
    user_list = user_list.filter(function(value){
        return value !== name;
    })
    console.log("**************");
    console.log(user_list);
    response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, next) {
    // console.log('ユーザ名：' + request.body.userName);
    // console.log(user_list);
    user_list.push(request.body.userName);
    // console.log(user_list);
    response.render('room', { userName: request.body.userName, user_list:user_list});
});

router.post('/room/room1', function (request, response, next) {
    console.log(request.body.userName + 'がroom1に移動しました。');
    response.render('room1', { userName: request.body.userName });
});

module.exports = router;
