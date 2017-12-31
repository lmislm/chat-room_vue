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
            //先获取已经连接的用户
            axios.get('/onlineusers')
                .then(function (response) {
                    for(var key in response.data){
                        if(this.connectUsers.indexOf(key) <= -1){
                            this.connectUsers.push(key); //更新
                        }
                    }
                    console.log(this.connectUsers);
                }.bind(this));
        }.bind(this));
        //如果server broadcasts 'user left'，从已连接数组中删除用户
        socket.on('user left',function (socketId) {
            var index = this.connectUsers.indexOf(socketId);  //很重要，同一窗口的用户刷新人数不变
            if(index >= 0){
                this.connectUsers.splice(index,1);
            }
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