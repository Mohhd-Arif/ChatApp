const express = require('express');
const app = express();
const server = require('http').createServer(app);
var io = require('socket.io').listen(server);
connections = [];
users = [];

server.listen(process.env.PORT || 8000);
console.log('server is running......');

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/index.html'); 
});

io.sockets.on('connection', (socket)=>{
	connections.push(socket);
	console.log('connected: %s socket', connections.length);

	socket.on('disconnect', (data)=>{
		connections.splice(connections.indexOf(socket),1);
		console.log('disconnected: %s socket', connections.length);
	});

	socket.on('send message', (data)=>{
		io.sockets.emit('new message',{msg:data});
	});
	
});