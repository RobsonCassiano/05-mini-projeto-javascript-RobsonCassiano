'use strict'

function gerarTabuada() {
    const numInput = document.getElementById('numero');
    const listaCorpo = document.getElementById('lista'); 
    const numero = Number(numInput.value);

    // Validação
    if (numInput.value.length === 0) {
        alert("Por favor, digite um número!");
        return;
    }

    // Limpa o conteúdo atual da tabela (tbody)
    listaCorpo.textContent = "";

    // Loop para gerar a tabuada de 1 a 10
    for (let i = 1; i <= 10; i++) {
        let resultado = numero * i;

        // 1. Cria a linha (tr)
        let linha = document.createElement('tr');

        // 2. Cria a primeira célula (td) e define o conteúdo
        let celulaExpressao = document.createElement('td');
        celulaExpressao.textContent = `${numero} x ${i}`;
        
        // 3. Cria a segunda célula (td) e define o conteúdo
        let celulaResultado = document.createElement('td');
        celulaResultado.textContent = resultado;

        // 4. Adiciona as células à linha
        linha.appendChild(celulaExpressao);
        linha.appendChild(celulaResultado);

        // 5. Adiciona a linha ao corpo da tabela
        listaCorpo.appendChild(linha);
    }
}
