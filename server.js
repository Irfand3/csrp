const express = require('express')
var cors = require('cors');
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { NFC } = require('nfc-pcsc');
const port = process.env.PORT || 5000
const webSocketPort = 8000
const webSocketServer = require('websocket').server
const nfc = new NFC();
const MemberModel = require('./models/memberModel')

connectDB()

const app = express()

const http = require('http');
const server = http.createServer();
server.listen(webSocketPort);

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/memberTypes', require('./routes/memberTypeRoutes'))
app.use('/api/members', require('./routes/memberRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

const wsServer = new webSocketServer({
httpServer: server
})

nfc.on('reader', reader => {

  console.log(`${reader.reader.name} device attached`);

  
wsServer.on('request', function (request) {
console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

// You can rewrite this part of the code to accept only the requests from allowed origin
const connection = request.accept(null, request.origin);

console.log('connected: ');
reader.on('card', card => {
  console.log(`${reader.reader.name} card detected`, card);
  const id = card.uid
if (request.resource === "/") {
    MemberModel.find({ cardId: id }).then( member =>  
    { 
      console.log(member)
        connection.sendUTF(JSON.stringify(member))
    })
  
}
else if (request.resource === "/dodaj-clana") 
{
  const member = {
    memberCardId: card.uid
    }
    connection.sendUTF(JSON.stringify(member))
}

});
});
})