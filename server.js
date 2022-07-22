require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const cookieSession = require('cookie-session');
const expressSession = require('express-session')
const mongoose = require('mongoose')
const server = require('http').createServer(app);
const passport = require('passport');
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});
const {PORT} = require('./config')
const cookie = { secret: "secret", resave: true, saveUninitialized: true };
  

console.log(process.env.NODE_ENV );
io.on('connection', (socket) => {

  socket.on("join_room", (data) => {

    socket.join(data.room);

    socket.to(data.room).emit("user-connected", data);
    socket.on('disconnect', () => {
      socket.to(data.room).emit("user-disconnected", data);
    })
  })
  socket.on("call-ended", (data) => {

    socket.to(data.room).emit("user-leave", data)
  })

  socket.on('join_chat_room', (data) => {
    socket.join(data.room);
  })
  socket.on('send-chat', (data) => {

    io.to(data.room).emit("receive-chat", data)
  })

  socket.on('off-video',data=>{
    io.to(data.room).emit("set-default-video", data)
  })
  socket.on('off-mic',data=>{
    io.to(data.room).emit("set-default-mic", data)
  })
  socket.on('share-screen',data=>{
    socket.to(data.room).emit("big-screen", data)
  })
  socket.on('stop-share-screen',data=>{
    socket.to(data.room).emit("close-big-screen", data)
  })

});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.set('trust proxy', 1);
app.use(expressSession({ secret: "secret", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/index'));

mongoose.connect(process.env.MONGO_URI, (err) => {
  !err && console.log('connected to database');
  err && console.log(err.message);
});


server.listen(PORT, () => console.log('Server is running' + PORT));