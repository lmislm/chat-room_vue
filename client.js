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
        //如果servers发出聊天消息chat.message，更新消息数组
        socket.on('chat.message',function (message) {
            this.messages.push(message);
        }.bind(this))

        //server emits '用户正在输入
        socket.on('user typing',function (username) {
            this.areTyping.push(username);
        }.bind(this));
        //server 发送‘停止正在输入’
        socket.on('stopped typing',function (username) {
            var index = this.areTyping.indexOf(username);
            if(index >= 0){
                this.areTyping.splice(index,1);
            }
        }.bind(this));

        //如果server broadcasts 'user left'，从已连接数组中删除用户
        socket.on('user left',function (socketId) {
            var index = this.connectUsers.indexOf(socketId);  //很重要，同一窗口的用户刷新人数不变
            if(index >= 0){
                this.connectUsers.splice(index,1);
            }
        }.bind(this));
    },
    methods:{
        send:function () {
            this.message.type = "chat";
            this.message.user = socket.id;
            this.message.timestamp = moment().calendar();
            socket.emit('chat.message',this.message);
            this.message.type = "";
            this.message.user = "";
            this.message.text = "";
            this.message.timestamp = "";

        },
        userIsTyping:function (username) {
            if(this.areTyping.indexOf(username) >= 0){
                return true;
            }
            return false;
        },
        userAreTyping:function () {
            if(this.areTyping.indexOf(socket.id) <= -1){
                this.areTyping.push(socket.id);
                socket.emit('user typing',socket.id);
            }
        },
        stoppedTyping:function (keycode) {
            if(keycode == '13' || (keycode == '8' && this.message.text == '')){
                var index = this.areTyping.indexOf(socket.id);
                if(index >= 0){
                    this.areTyping.splice(index,1);
                    socket.emit('stopped typing',socket.id);
                }
            }
        }
    }
});