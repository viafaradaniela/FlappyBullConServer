import { express, Server, cors, os } from './dependencies.js'
const SERVER_IP = "172.30.213.141";//CAMBIAR IP SIEMPRE

const expressApp = express(); 
const PORT = 5051;

expressApp.use(cors({ origin: "*" }));
expressApp.use(express.json()) 
expressApp.use('/app', express.static('public - app'));
expressApp.use('/mupi', express.static('public - mupi'));

const httpServer = expressApp.listen(PORT, () => {
;
    console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    console.table({ 
        'Client Endpoint' : `http://${SERVER_IP}:${PORT}/app`,
        'Mupi Endpoint': `http://${SERVER_IP}:${PORT}/mupi` });
});

const io = new Server(httpServer, { path: '/real-time' }); 

io.on('connection', socket => {
    console.log('Conectado', socket.id);
    
socket.on('Hola', (messages) => {
console.log(messages)
socket.broadcast.emit('display-Hola', messages)})
});

let userData;
expressApp.post('/user-data', (req, res) => {
    userData = req.body;
    res.send({Data: `User data is: ${userData}`})
    console.log(userData);
});
