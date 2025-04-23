const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let counter = { A: 0, B: 0, C: 0, D: 0 };

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.emit('update', counter); // ส่งค่าเริ่มต้นให้ client

    socket.on('press', (key) => {
        if (counter[key] !== undefined) {
            counter[key]++;
            io.emit('update', counter); // ส่งให้ทุก client
        }
    });
    socket.on('reset', () => {
        console.log('RESET received');
        counter = { A: 0, B: 0, C: 0, D: 0 };
        io.emit('update', counter);
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});