const express = require('express');
const { Router } = require('express');
const app = express();
const port = process.env.PORT || 3000;
const www = process.env.WWW || './public';

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

// app.post('/', (req, res) => {
//     console.log('Got id:', req.body);
//     res.sendStatus(200);
// });

var clienteids = new Array();

app.post('/send',(req, res) => {
    var id=req.body.id;    
    console.log("Id de cliente= "+id);
    res.end("funca");
    clienteids.push(id);
    console.log(clienteids[0]);
 }); 


 app.get('/test', function(req,res) {
    var cliente = clienteids[0]
    //elimino de la lista de espera de clientes con shift
    clienteids.shift();
    res.send(cliente);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
