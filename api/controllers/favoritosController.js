const favoritosService = require('../services/favoritosService');

function listar(req, res) {
  res.json(favoritosService.listar());
}

function criar(req, res) {
  const { jogoId, observacao = '' } = req.body || {};
  if (!jogoId) return res.status(400).json({ erro: 'jogoId e obrigatorio' });

  const resultado = favoritosService.criar(parseInt(jogoId, 10), observacao);
  if (resultado.erro) return res.status(resultado.status).json({ erro: resultado.erro });
  res.status(resultado.status).json(resultado.dados);
}

function atualizar(req, res) {
  const id = parseInt(req.params.id, 10);
  const { observacao } = req.body || {};

  if (observacao === undefined) {
    return res.status(400).json({ erro: 'Campo observacao e obrigatorio' });
  }

  const resultado = favoritosService.atualizar(id, observacao);
  if (resultado.erro) return res.status(resultado.status).json({ erro: resultado.erro });
  res.json(resultado.dados);
}

function remover(req, res) {
  const id = parseInt(req.params.id, 10);
  const resultado = favoritosService.remover(id);
  if (resultado.erro) return res.status(resultado.status).json({ erro: resultado.erro });
  res.status(204).send();
}

module.exports = { listar, criar, atualizar, remover };
