const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// criando cors
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);


io.on('connection', socket => {
    // sessoes 
    socket.on('connectRoom', box => {
        socket.join(box);
    });
    console.log('Ok');
});

// conexao com DB
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-3ad15.gcp.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

// aqui fara que todo aceso possa usar socketio
app.use((req, res, next) => {
    req.io = io;

    // precisa deste next para nao par no fim da variavel
    return next();
});

// definindo tipo de dados
app.use(express.json());
// permitir envio de arquivos \/
app.use(express.urlencoded({
    extended: true
}));
// este metodo use vai ate a rota para exibir o arquivo
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

// apontados que vamos usar as rotas
app.use(require('./routes'));
// porta
server.listen(process.env.PORT || 3000);