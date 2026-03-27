'use strict';

// Passo 1: Guardar em constantes os elementos do HTML.
const valorTotalInput = document.getElementById('valorTotal');
const taxaJurosInput = document.getElementById('taxaJuros');
const numParcelasInput = document.getElementById('numParcelas');
const valorParcelaInput = document.getElementById('valorParcela');
const botaoSimular = document.querySelector('button');
const tabelaCorpo = document.getElementById('tabelaCorpo');
const cabecalhoAmortizacao = document.querySelector('thead th:nth-child(4)');

// Ajustar o titulo da 4a coluna sem alterar o HTML original do exercicio.
if (cabecalhoAmortizacao) {
  cabecalhoAmortizacao.textContent = 'Amortizacao';
}

// Passo 2: Sempre que o usuario digitar nos campos principais, recalcular a parcela automaticamente.
valorTotalInput.addEventListener('input', atualizarValorParcela);
taxaJurosInput.addEventListener('input', atualizarValorParcela);
numParcelasInput.addEventListener('input', atualizarValorParcela);

// Passo 3: Quando clicar no botao, executar a simulacao completa do financiamento.
botaoSimular.addEventListener('click', simularFinanciamento);

// Passo 4: Funcao para formatar moeda Reais.
function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Passo 5: Funcao que calcula o valor fixo da parcela.
function calcularValorParcela(valorTotal, taxaJuros, numParcelas) {
  // Transformar a taxa percentual em taxa decimal.
  let taxaMensal = taxaJuros / 100;

  // Se os valores principais nao forem validos, retornar zero.
  if (valorTotal <= 0 || numParcelas <= 0) {
    return 0;
  }

  // Se a taxa for zero, dividir apenas o valor total pela quantidade de parcelas.
  if (taxaMensal === 0) {
    return valorTotal / numParcelas;
  }

  // Calcular o fator da formula de financiamento com juros compostos.
  let fator = (1 + taxaMensal) ** numParcelas;

  // Retornar o valor da parcela usando a formula do financiamento.
  return valorTotal * ((taxaMensal * fator) / (fator - 1));
}

// Passo 6: Atualizar automaticamente o campo da parcela quando os dados mudarem.
function atualizarValorParcela() {
  // Ler os valores digitados pelo usuario.
  let valorTotal = Number(valorTotalInput.value);
  let taxaJuros = Number(taxaJurosInput.value);
  let numParcelas = Number(numParcelasInput.value);

  // Calcular o valor da parcela com base nesses dados.
  let valorParcela = calcularValorParcela(valorTotal, taxaJuros, numParcelas);

  // Se o valor calculado for valido, mostrar com duas casas decimais.
  if (valorParcela > 0) {
    valorParcelaInput.value = valorParcela.toFixed(2);
    return;
  }

  // Se ainda nao houver dados suficientes, limpar o campo.
  valorParcelaInput.value = '';
}

// Passo 7: Criar a funcao responsavel por montar a tabela da simulacao.
function simularFinanciamento() {
  // Ler os valores informados pelo usuario.
  let valorTotal = Number(valorTotalInput.value);
  let taxaJuros = Number(taxaJurosInput.value);
  let numParcelas = Number(numParcelasInput.value);

  // Recalcular a parcela para garantir que a simulacao use o valor correto.
  let valorParcela = calcularValorParcela(valorTotal, taxaJuros, numParcelas);

  // Converter a taxa percentual em decimal para usar nos calculos mensais.
  let taxaMensal = taxaJuros / 100;

  // Validar se os dados principais foram preenchidos corretamente.
  if (valorTotal <= 0 || taxaJuros < 0 || numParcelas <= 0 || valorParcela <= 0) {
    alert('Por favor, preencha valor, taxa e quantidade de meses corretamente!');
    return;
  }

  // Atualizar o campo da parcela com o valor final calculado.
  valorParcelaInput.value = valorParcela.toFixed(2);

  // Limpar a tabela antes de gerar uma nova simulacao.
  tabelaCorpo.textContent = '';

  // Comecar o saldo devedor com o valor total do financiamento.
  let saldoDevedor = valorTotal;

  // Passo 8: Repetir o calculo para cada mes da simulacao.
  for (let mes = 1; mes <= numParcelas; mes += 1) {
    // Descobrir quanto de juros foi cobrado no mes atual.
    let jurosDoMes = saldoDevedor * taxaMensal;

    // Calcular quanto da parcela realmente reduz a divida.
    let amortizacaoDoMes = valorParcela - jurosDoMes;

    // Atualizar o saldo devedor considerando juros do periodo e a parcela paga.
    saldoDevedor = saldoDevedor + jurosDoMes - valorParcela;

    // Evitar que o saldo final fique negativo por causa de arredondamentos.
    if (saldoDevedor < 0) {
      saldoDevedor = 0;
    }

    // Criar uma nova linha da tabela para representar o mes atual.
    let linha = document.createElement('tr');

    // Organizar os dados que serao colocados nas colunas da linha.
    let colunas = [
      { texto: mes },
      { texto: formatarMoeda(jurosDoMes), classe: 'col-juros' },
      { texto: formatarMoeda(valorParcela) },
      { texto: formatarMoeda(amortizacaoDoMes), classe: 'col-total' },
      { texto: formatarMoeda(saldoDevedor), classe: 'col-saldo' }
    ];

    // Passo 9: Percorrer cada dado da linha para criar as celulas.
    for (let i = 0; i < colunas.length; i += 1) {
      // Criar uma nova celula.
      let celula = document.createElement('td');

      // Inserir o texto correspondente naquela celula.
      celula.textContent = colunas[i].texto;

      // Se houver classe definida, aplicar a classe na celula.
      if (colunas[i].classe) {
        celula.className = colunas[i].classe;
      }

      // Adicionar a celula dentro da linha.
      linha.appendChild(celula);
    }

    // Adicionar a linha completa dentro do corpo da tabela.
    tabelaCorpo.appendChild(linha);
  }
}
