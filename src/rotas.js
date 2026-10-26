const express = require('express');
const funcoes = require('./funcoes');

const router = express.Router();

function sucesso(res, status, mensagem, dados) {
  return res.status(status).json({ sucesso: true, mensagem, dados });
}

router.post('/vendedores', async (req, res) => {
  const vendedor = await funcoes.cadastrarVendedor(req.body || {});
  return sucesso(res, 201, 'Vendedor cadastrado com sucesso.', vendedor);
});

router.get('/vendedores', async (_req, res) => {
  const vendedores = await funcoes.listarVendedores();
  return sucesso(res, 200, 'Vendedores consultados com sucesso.', vendedores);
});

router.get('/vendedores/:id', async (req, res) => {
  const vendedor = await funcoes.consultarVendedorPorId(req.params.id);
  return sucesso(res, 200, 'Vendedor consultado com sucesso.', vendedor);
});

router.put('/vendedores/:id', async (req, res) => {
  const vendedor = await funcoes.atualizarVendedor(req.params.id, req.body || {});
  return sucesso(res, 200, 'Vendedor atualizado com sucesso.', vendedor);
});

router.patch('/vendedores/:id/desativar', async (req, res) => {
  const vendedor = await funcoes.desativarVendedor(req.params.id);
  return sucesso(res, 200, 'Vendedor desativado com sucesso. O histórico foi preservado.', vendedor);
});

router.post('/vendas', async (req, res) => {
  const venda = await funcoes.registrarVenda(req.body || {});
  return sucesso(res, 201, 'Venda registrada com sucesso.', venda);
});

router.get('/vendas', async (_req, res) => {
  const vendas = await funcoes.listarVendas();
  return sucesso(res, 200, 'Vendas consultadas com sucesso.', vendas);
});

router.get('/vendas/vendedor/:id', async (req, res) => {
  const vendas = await funcoes.consultarVendasPorVendedor(req.params.id);
  return sucesso(res, 200, 'Vendas do vendedor consultadas com sucesso.', vendas);
});

router.get('/vendas/regiao/:id', async (req, res) => {
  const vendas = await funcoes.consultarVendasPorRegiao(req.params.id);
  return sucesso(res, 200, 'Vendas da região consultadas com sucesso.', vendas);
});

router.delete('/vendas/:id', async (req, res) => {
  const resultado = await funcoes.excluirVenda(req.params.id);
  return sucesso(res, 200, 'Venda excluída com sucesso.', resultado);
});

router.get('/relatorios/performance', async (req, res) => {
  const relatorio = await funcoes.gerarRelatorioPerformance(req.query.inicio, req.query.fim);
  return sucesso(res, 200, 'Relatório de performance gerado com sucesso.', relatorio);
});

module.exports = router;
