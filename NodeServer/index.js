const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {
    console.log('New client connected:', socket.id);
    socket.on('new-user-joined', name => {
        console.log("User Joined", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    socket.on('send', message => {
        console.log("Message received from", users[socket.id], ":", message);
        socket.broadcast.emit('receive', {
            message,
            name: users[socket.id]
        });
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        const name = users[socket.id];
        delete users[socket.id];
        if(name) {
            socket.broadcast.emit('user-left', name);
        }
    });
});

server.listen(8000, () => {
    console.log("Socket.io server running on port 8000");
});
