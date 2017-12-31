var socket = io();

new Vue({
    el:'#app',
    data:{
//                deleteLater: "hello world",
        connectUsers:[],
        messages:[],
        message:{
            "type":"",
            "action":"",
            "user":"",
            "text":"",
            "timestamp":""
        },
        areTyping: [] //who typing
    },
    created: function () { //who join,est
        //如果server emits '用户已加入’，需要更新连接用户的数组
        socket.on('user joined',function (socketId) {//如果获得则
            this.connectUsers.push(socketId); //更新
        }.bind(this));
    },
    method:{
        send:function () {

        },
        userIsTyping:function (username) {

        },
        userAreTyping:function () {

        },
        stoppedTyping:function () {

        }
    }
});