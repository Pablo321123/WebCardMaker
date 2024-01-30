const express = require('express')
const http = require('http')
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const templateFiles = path.join(__dirname, '../template')
const imgFiles = path.join(__dirname, '../src/img')
const fontFiles = path.join(__dirname, '../fonts/')

const defaultPort = 8088


const app = express()
app.use(cors());
app.use(express.static(templateFiles))
app.use(express.static(imgFiles))
app.use(express.static(fontFiles))

//Permissões para permitir a comunicação entre portas
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });



app.get('', (req, res, next) => {
    res.sendFile(path.join(templateFiles, '/index.html'))
})


const server = http.createServer(app) //Abrir o servidor HTTP
server.listen(defaultPort, () => { //Servidor aberto e ouvindo as portas para requisições
    console.log(`Servidor HLS rodando em http://localhost:${defaultPort}`)
  })
