
const socket=io('http://localhost:8000');
const form=document.getElementById('form_send')
const input=document.getElementById('input');
const container=document.querySelector('.container1');
var audio=new Audio('Oh no.mp3');


form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message=input.value;
  socket.emit('send_message',message);
  append(`You : ${message}`,'right');
  socket.emit('send',message);
  input.value='';
})
const append =(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    container.appendChild(messageElement);
    if(position=='left'){
    audio.play();
    };
};
const Name= prompt("Enter your name to join");
socket.emit('new-user-joined', Name);
socket.on('user-joined', data=>{
  append(`${data} joined chat!`,'right')
  audio.play();
});
socket.on('user-left', data=>{
  append(`${data} left the chat!`,'right')
  audio.play();
});
socket.on('receive', data=>{
  append(`${data.name}: ${data.message}`,'left')
});

