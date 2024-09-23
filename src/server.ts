import express, { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

class App {
    private app: Application;
    private http: http.Server;
    private io: Server;
    private messageHistory: Array<{ user: string, color: string, message: string }> = []; // Armazenar mensagens

    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);

        this.listenSocket(); // Configura a escuta dos sockets
        this.setupRoutes();  // Configura as rotas da aplicação
    }

    // Inicializa o servidor HTTP
    listenServer() {
        this.http.listen(3000, () => console.log('Server is running on port 3000'));
    }

    // Escuta e trata os eventos de socket
    listenSocket() {
        this.io.on('connection', (socket) => {
            console.log('User connected =>', socket.id);

            // Envia as últimas 10 mensagens para o novo usuário
            socket.emit('previousMessages', this.messageHistory);

            // Escuta o evento 'chat message' enviado pelos clientes
            socket.on('chat message', (data) => {
                console.log(`Message from ${data.user} (${data.color}): ${data.message}`);

                // Armazena a mensagem na memória (mantém apenas as últimas 10)
                this.messageHistory.push({ user: data.user, color: data.color, message: data.message });
                if (this.messageHistory.length > 10) {
                    this.messageHistory.shift(); // Remove a mensagem mais antiga
                }

                // Envia a mensagem para todos os clientes conectados
                this.io.emit('chat message', { user: data.user, color: data.color, message: data.message });
            });

            // Loga quando um usuário desconecta
            socket.on('disconnect', () => {
                console.log('User disconnected =>', socket.id);
            });
        });
    }

    // Define as rotas para servir o HTML
    setupRoutes() {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html')); // Servir o HTML
        });
    }
}

const app = new App();
app.listenServer(); // Inicia o servidor
