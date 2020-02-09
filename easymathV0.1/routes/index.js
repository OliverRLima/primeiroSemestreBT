// configuração

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

// configurando o banco
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bandtec",
    database: "easymath_bd"
});

connection.connect(function(err){
    if(err) return console.log(err);
        console.log('conectou!');
});

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// rotas
const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!'}));
app.use('/', router);

router.post('/usuarios', (req, res) => {
    const nomeUsuario = req.body.username;
    const emailUsuario = req.body.email;
    const senhaUsuario = req.body.senha;
    
    execSQLQuery(`INSERT INTO usuarios (nomeUsuario, emailUsuario, senhaUsuario) VALUES
                 ('${nomeUsuario}','${emailUsuario}','${senhaUsuario}')`, res);
});


// inicia o servidor
app.listen(port);
console.log('API FUNCIONANDO!');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "bandtec",
        database: "easymath_bd"
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }