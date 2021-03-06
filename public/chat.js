$(function(){
    var socket = io.connect('http://localhost:3000')

    //buttons, inputs
    var send_msg = $("#send_msg")
    var send_usr = $("#send_usr")
    var chatroom = $("#chatroom")

    //Send message, emitting to all sockets
    send_msg.on('keydown', function(e){
        if(e.which == 13){
            console.log(send_msg.val())
            if(send_msg.val() != ""){
                socket.emit('new_message', {message: send_msg.val()})
            }
            send_msg.val("")
        }
    })

    //Change username, emitting to server
    send_usr.on('keydown', function(e){
        if(e.which == 13){
            console.log(send_usr.val())
            socket.emit('change_username', {username: send_usr.val()})
        }
    })

    //Recieve and add messages to chatroom
    socket.on('new_message', (data)=>{
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
        chatroom.scrollTop(100000000000000000);
    })
});