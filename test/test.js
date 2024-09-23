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

describe('Teste de Envio de Mensagem', () => {
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

    it('Deve enviar e receber uma mensagem', (done) => {
        const testMessage = 'Olá, mundo!';
        
        socket.emit('sendMessage', testMessage);

        socket.on('receiveMessage', (message) => {
            assert.equal(message, testMessage);
            done();
        });
    });
});
