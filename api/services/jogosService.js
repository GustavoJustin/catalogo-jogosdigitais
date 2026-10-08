const jogos = require('../data/jogos');

function buscarTodos() {
  return jogos;
}

function buscarPorId(id) {
  return jogos.find((jogo) => jogo.id === id) ?? null;
}

module.exports = { buscarTodos, buscarPorId };
