const assert = require('assert');
const io = require('socket.io-client');

describe('Teste Básico', function() {
  it('Deve retornar verdadeiro', function() {
    assert.strictEqual(true, true);
  });
});

describe('Teste de Conexão WebSocket', () => {
    let socket;

    beforeEach((done) => {
        socket = io('http://localhost:3000');
        socket.on('connect', () => {
            done();
        });
    });

    afterEach(() => {
        socket.close();
    });

    it('Deve conectar ao servidor WebSocket', (done) => {
        assert.equal(socket.connected, true);
        done();
    });
});

describe('Teste de Envio de Mensagem', function() {
    this.timeout(5000); // Aumenta o timeout para 5 segundos

    let socket;

    beforeEach((done) => {
        socket = io('http://localhost:3000');
        socket.on('connect', () => {
            done();
        });
    });

    afterEach(() => {
        socket.close();
    });

    it('Deve enviar e receber uma mensagem', function(done) {
        this.timeout(5000); // Timeout de 5 segundos para este teste
        const testMessage = 'Olá, mundo!';

        socket.emit('sendMessage', testMessage);

        const timeout = setTimeout(() => {
            done(new Error('A mensagem não foi recebida a tempo'));
        }, 4000); // 4 segundos para esperar a resposta

        socket.on('receiveMessage', (message) => {
            clearTimeout(timeout); // Cancela o timeout se a mensagem for recebida
            assert.equal(message, testMessage);
            done();
        });
    });
});
