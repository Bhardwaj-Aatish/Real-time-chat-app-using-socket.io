const socket = io('http://localhost:8000');
// const socket = io('https://yourDomain:8000', { transports: ['websocket'] });

// var socket = io.connect("http://localhost:8000", {
//    forceNew: true,
//    transports: ["polling"],
// });

const form = document.getElementById('sendContainer')
const messageInput= document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('movemine.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}` , `right`);
    socket.emit('send',message);
    messageInput.value='';
})

const names = prompt("Enter you name to join");
socket.emit('new-user-joined', names);

socket.on('user-joined',names =>{
    append(`${names} joined the chat`, `right`)
    
})

socket.on('receive', data => {
    append(`${data.names}:${data.message}` , `left`);
})

socket.on('left', names  => {
    append(`${names} left the chat` , `left`);
})

