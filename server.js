const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: "*"
    }
  });


  io.on('connection', (socket) =>{
   
    socket.on("join_room", (data) => {
  
        socket.join(data.room);
       
        socket.to(data.room).emit("user-connected",data);

        socket.on('disconnect',()=>{
        socket.to(data.room).emit("user-disconnected",data.id);
        })

      
      })
    // socket.on("send_message", async (data) => {
    //     socket.to(data.room).emit("recieve_message", data);
    // });
  });

  server.listen(5000, () => console.log('Server running at port', 5000));