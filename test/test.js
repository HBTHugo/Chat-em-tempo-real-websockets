const assert = require('assert');
const io = require('socket.io-client');

describe('Teste Básico', function() {
  it('Deve retornar verdadeiro', function() {
    assert.strictEqual(true, true);
  });
});

describe('Teste de Conexão WebSocket', function() {
  this.timeout(10000); // Define um timeout de 10 segundos

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
  this.timeout(10000); // Define um timeout de 10 segundos

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
    const testMessage = 'Olá, mundo!';
    const username = 'TesteUser';
    const color = '#000000'; // Cor aleatória, pode ser qualquer valor

    socket.emit('chat message', { user: username, color: color, message: testMessage });

    socket.on('chat message', (data) => {
      if (data.message === testMessage && data.user === username) {
        assert.equal(data.message, testMessage);
        done();
      }
    });
  });
});
