const express = require('express');
const { Router } = require('express');
//usamos express porque era conveniente para facilitar la creacion del backend, con menos lineas, simplificando para hacer mas mantenible el codigo (mantenibilidad)
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './public';//usamos public por seguridad

//Para hacer GETS y POSTS de cliente y moderador
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.json());

//servir index.html
app.use(express.static(www));
console.log(`serving ${www}`);
app.get('/', (req, res) => {
    res.sendFile(`index.html`, { root: www });
});



var clienteids = new Array();
var historial = new Array();//historial en este demo solo se guarda en memoria, pero se podria utilizar los metodos para que traigan de una base de datos

//post id desde cliente
app.post('/send',(req, res) => {
    var id=req.body.id;    
    console.log("Id de cliente= "+id);
    res.end("funca");
    clienteids.push(id);
    console.log(clienteids[0]);
 }); 


 app.get('/enviarid', function(req,res) {
    var cliente = clienteids[0]
    //elimino de la lista de espera de clientes con shift
    clienteids.shift();
    res.send(cliente);
});


//recibir el historial de chat
app.post('/save',(req, res) => {
    historial= req.body.historial;    
    console.log("Historial= "+historial);
    res.end("funca");
    
 }); 

 app.get('/historial', function(req,res) {
    var jsoneado = JSON.stringify(historial);
    console.log("Ultima conversacion enviada");
    res.send(jsoneado);
});


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
