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

        // Exibir mensagem por 2 segundos se o status for 200
        if (data.Status === '200') {
            document.getElementById('mensagem').innerText = data.mensagem;
            await sleep(2000);
            document.getElementById('mensagem').innerText = '';
        } else {
            // Exibir mensagem por tempo indeterminado em destaque (em vermelho)
            document.getElementById('mensagem').innerText = data.mensagem;
            document.getElementById('mensagem').style.color = 'red';
        }
    } catch (error) {
        console.error('Erro ao enviar voto:', error);
        document.getElementById('mensagem').innerText = 'Erro ao registrar voto, contate o administrador do sistema';
        document.getElementById('mensagem').style.color = 'red';
    } finally {
        // Habilitar campos e botões após o término da requisição
        document.getElementById('idNumeroCandidato').disabled = false;
        document.getElementById('idCPF').disabled = false;
        document.querySelector('.confirmar').disabled = false;
        document.querySelector('.cancelar').disabled = false;
        document.querySelector('.branco').disabled = false;
    }
}

// Remover event listener antes de adicioná-lo para evitar associação múltipla
document.querySelector('.confirmar').removeEventListener('click', enviarVoto);

// Associar a função `enviarVoto` ao evento de clique do botão "Confirmar"
document.querySelector('.confirmar').addEventListener('click', enviarVoto);


// Função para resetar a urna (voltar à opção inicial)
function resetUrna() {
    document.getElementById('idNumeroCandidato').value = '';
    document.getElementById('idCPF').value = '';
    document.getElementById('idNomeCandidato').value = '';
    document.getElementById('idFoto').src = '';
    document.getElementById('idFoto').alt = '';
}

// Função para contabilizar voto em branco
function contabilizarBranco() {
    const dadosVoto = {
        CPF: '',
        numeroCandidato: '',
    };
    enviarVoto(dadosVoto);
}

// Função para contabilizar voto nulo (número aleatório ou digitado)
function contabilizarNulo() {
    const numeroDigitado = document.getElementById('idNumeroCandidato').value;

    // Se o número digitado não corresponder a nenhum candidato cadastrado, registra como voto nulo
    const dadosVoto = {
        CPF: '',
        numeroCandidato: isNaN(numeroDigitado) ? Math.floor(Math.random() * 1000000).toString() : numeroDigitado,
    };

    enviarVoto(dadosVoto);
}


// Função para enviar voto (reutilizando a função anterior)
async function enviarVoto(dadosVoto) {
    try {
        const response = await fetch('http://localhost:3000/voto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosVoto),
        });

        const data = await response.json();

        // Exibir mensagem de sucesso ou erro ao usuário
        if (data.Status === '200') {
            alert('Voto registrado com sucesso: ' + data.mensagem);
            // Reiniciar a urna após registrar o voto
            resetUrna();
        } else {
            alert('Erro ao registrar voto: ' + data.mensagem);
        }
    } catch (error) {
        console.error('Erro ao enviar voto:', error);
        alert('Erro ao registrar voto, contate o administrador do sistema');
    }
}

async function cargainicial() {
    const resp = await fetch("http://localhost:3000/cargainicial");
    return resp.json();
}