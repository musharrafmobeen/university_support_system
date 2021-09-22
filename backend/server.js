const http = require('http');
const app = require('./app');
const socketio = require('socket.io');
const formatMessage = require('./chat-utils/messages');
const port = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', socket =>{
    console.log('New Web Socket');
    socket.emit('message', 'Welcome to ChatCord!')

    socket.broadcast.emit('message','A user has joined the chat');

    socket.on('disconnect',()=>{
        io.emit('message', 'User Has Left The Chat');
    });

    //Listen
    socket.on('chatMessage',(msg)=>{
        io.emit('message',msg);
    });
});

server.listen(port);