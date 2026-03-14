'use strict'

function gerarContagem () {
    

    const inicio = document.getElementById('inicio');
    const fim = document.getElementById('fim');
    const salto = document.getElementById('salto');
    const lista = document.getElementById('lista');

    
    if (!inicio || !fim || !salto || !lista) {
        console.error("Elementos do DOM não encontrados.");
        return;
    }

    
    lista.textContent = ''; 

    let iInicio = Number(inicio.value);
    let iFim = Number(fim.value);
    let iSalto = Number(salto.value);

    if (iSalto <= 0) {
        alert("O salto deve ser maior que zero.");
        return;
    }

    for (let i = iInicio; i <= iFim; i += iSalto ) {
        const itemLista = document.createElement('li');
        itemLista.textContent = i;
        lista.appendChild(itemLista);
    }
}


















