const express = require("express")
const app = express()

//template engine for ejs
app.set('view engine', 'ejs')

//Static dirs
app.use(express.static(__dirname + '/public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})

//port, localhost:3000
server = app.listen(3000)

const io = require("socket.io")(server)
io.on('connection', (socket) => {
    console.log('New user')

    //default
    socket.username = "Anon"

    //namechange
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //emit message to all sockets connected
    socket.on('new_message', (data)=>{
        io.sockets.emit('new_message', {message: data.message, username: socket.username})
    })
})