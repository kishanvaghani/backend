let express = require('express')
let app = express();
let dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

const option = app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Method",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
})

// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// Route Middleware

//Router 
// User Login or Register
const user = require('./routes/user');
app.use("/api/user", user);

//Sent Email
const sendMail = require('./routes/sendMail');
app.use("/api/sendmail", sendMail);

//chat section
const chat = require('./routes/chat');
app.use("/api/chat", chat);

let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//New Connection Socket

// const http = require('http').Server(server);
let socket = require('socket.io');
let io = socket(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log(`new connection ${socket.id}`);
  socket.on('chat',function (data){
    // console.log(data); 
    io.sockets.emit("chat",(data));
    console.log("chat");
  });
  socket.on('typing', function (data) {
    io.sockets.emit('typing', data);
  });
  socket.on('typingDone', function (data) {
    // console.log(`Server received ${data} is typing`);
    // console.log('need to inform all the clients about this');
    io.sockets.emit('typingDone', data);
    //socket.broadcast.emit('typing', data);
  });
})