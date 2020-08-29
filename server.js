require('dotenv').config()

const mongoose = require('mongoose')

var express = require('express');
var app = express();
var http = require("http").Server(app)
var io = require('socket.io')(http);

app.use((req,res,next)=> {
    res.header("Access-Control-Allow-Credentials",true)
    res.header("Access-Control-Allow-Origin",'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


io.on('connection', function(socket){
  //对应的socket再监听名为sendmsg的事件触发
  socket.on('sendmsg',function(data){
    console.log('server receive :' ,data);
    // 然后我们再来让服务器监听到发送消息的事件后，触发出广播事件
    io.emit('recvmsg',data)
  })
  console.log("a user connected")
})

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true,useNewUrlParser: true });
const db = mongoose.connection

db.on('error',(error)=>console.log(error))
db.once('open', ()=>console.log('Connected to Database'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

// app.get('/api/customers',(req,res)=>{
//     const customers = [
//         {id:1, name: 'haha'},
//         {id:2, name: 'haha2'},
//         {id:3, name: 'haha3'}
//     ];

//     res.json(customers);
// })
const port = 5000
// app.listen(port, () => console.log(`server start on ${port}`))
http.listen(port, () => console.log(`server start on ${port}`))