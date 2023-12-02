var candidatos;



(async function(){
    candidatos = await cargainicial();
    console.log(candidatos[0].tipoEleicao);

    if (candidatos[0].tipoEleicao == "a") {
        document.getElementById("idCPF").hidden = true;
    }

    document.getElementById("idNumeroCandidato").onchange = function() {
        let cand = candidatos.filter((value) => {
            return value.numeroCandidato == document.getElementById("idNumeroCandidato").value;
        });

        if (cand.length === 1) {
            document.getElementById("idNomeCandidato").value = cand[0].nomeCandidato;
            document.getElementById("idFoto").src = cand[0].urlFoto;
            document.getElementById("idFoto").alt = cand[0].nomeCandidato;
        }
    };
})();



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function enviarVoto() {
    // Desabilitar campos e botões durante o envio da requisição
    document.getElementById('idNumeroCandidato').disabled = true;
    document.getElementById('idCPF').disabled = true;
    document.querySelector('.confirmar').disabled = true;
    document.querySelector('.cancelar').disabled = true;
    document.querySelector('.branco').disabled = true;

    try {
        const idNumeroCandidato = document.getElementById('idNumeroCandidato').value;
        const idCPF = document.getElementById('idCPF').value;

        const dadosVoto = {
            CPF: idCPF,
            numeroCandidato: idNumeroCandidato,
        };

        const response = await fetch('http://localhost:3000/voto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosVoto),
        });

        const data = await response.json();

        // Exibir mensagem de sucesso com alert
        if (data.Status === '200') {
            alert(data.mensagem);
        } else {
            // Exibir mensagem de erro com alert
            alert(data.mensagem);
        }
    } catch (error) {
        console.error('Erro ao enviar voto:', error);
        // Exibir mensagem de erro com alert
        alert('Erro ao registrar voto, contate o administrador do sistema');
    } finally {
        // Habilitar campos e botões após o término da requisição
        document.getElementById('idNumeroCandidato').disabled = false;
        document.getElementById('idCPF').disabled = false;
        document.querySelector('.confirmar').disabled = false;
        document.querySelector('.cancelar').disabled = false;
        document.querySelector('.branco').disabled = false;
    }
}

// // Remover event listener antes de adicioná-lo para evitar associação múltipla
// document.querySelector('.confirmar').removeEventListener('click', enviarVoto);

// Associar a função `enviarVoto` ao evento de clique do botão "Confirmar"
document.querySelector('.confirmar').addEventListener('click', enviarVoto);



async function cargainicial() {
    const resp = await fetch("http://localhost:3000/cargainicial");
    return resp.json();
}