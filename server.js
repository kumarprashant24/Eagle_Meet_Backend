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
const cookie = { secret: "secret", resave: true, saveUninitialized: true };

io.on('connection', (socket) => {

  socket.on("join_room", (data) => {

    socket.join(data.room);

    socket.to(data.room).emit("user-connected", data);
    socket.on('disconnect', () => {
      io.to(data.room).emit("user-disconnected", data);
    })
  })
  socket.on("call-ended", (data) => {

    io.to(data.room).emit("user-leave", data)
  })

  socket.on('join_chat_room', (data) => {
    socket.join(data.room);
  })
  socket.on('send-chat', (data) => {

    io.to(data.room).emit("receive-chat", data)
  })

});

app.use(
  cors({
    origin: "http://localhost:3000",
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

mongoose.connect('mongodb+srv://prashant24:Prince24@cluster0.2pd6v.mongodb.net/eagle_meet?retryWrites=true&w=majority', (err) => {
  !err && console.log('connected to database');
  err && console.log(err.message);
});


server.listen(5000, () => console.log('Server running at port', 5000));