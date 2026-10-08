const store = require('../data/favoritosStore');
const jogosService = require('./jogosService');

function listar() {
  // Join manual: embute os dados do jogo em cada favorito
  return store.getAll().map((fav) => ({
    ...fav,
    jogo: jogosService.buscarPorId(fav.jogoId),
  }));
}

function criar(jogoId, observacao) {
  const jogo = jogosService.buscarPorId(jogoId);
  if (!jogo) return { erro: 'jogoId invalido — jogo nao encontrado', status: 400 };

  if (store.findByJogoId(jogoId)) {
    return { erro: 'Este jogo ja esta nos favoritos', status: 409 };
  }

  const favorito = store.create(jogoId, observacao);
  return { dados: favorito, status: 201 };
}

function atualizar(id, observacao) {
  const atualizado = store.update(id, observacao);
  if (!atualizado) return { erro: 'Favorito nao encontrado', status: 404 };
  return { dados: atualizado, status: 200 };
}

function remover(id) {
  const removido = store.remove(id);
  if (!removido) return { erro: 'Favorito nao encontrado', status: 404 };
  return { status: 204 };
}

module.exports = { listar, criar, atualizar, remover };
