


const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const path = require('path');
const server = app.listen(9000);
const peerServer = ExpressPeerServer(server, {
    path: '/myapp'
  });
  

app.use(express.static('public'));
app.use('/peerjs', peerServer);
app.get('/', function(req, res) {
    res.render('index');
});
// =======






