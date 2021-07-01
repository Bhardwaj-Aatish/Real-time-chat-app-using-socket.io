// node server that will help in handling the socket io connection
const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', names =>{
        // console.log("new user", names);
        users[socket.id]=names;
        socket.broadcast.emit('user-joined', names);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive' , {message:message, names:users[socket.id] });
    })

    socket.on('disconnect' , message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});
