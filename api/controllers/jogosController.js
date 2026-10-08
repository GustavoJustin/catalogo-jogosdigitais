const jogosService = require('../services/jogosService');

function listar(req, res) {
  res.json(jogosService.buscarTodos());
}

function detalhe(req, res) {
  const id = parseInt(req.params.id, 10);
  const jogo = jogosService.buscarPorId(id);
  if (!jogo) return res.status(404).json({ erro: 'Jogo nao encontrado' });
  res.json(jogo);
}

module.exports = { listar, detalhe };
