 // Function to request the initial configuration data
 function requestConfigData() {
    fetch('/config')
        .then(response => response.json())
        .then(data => {
            // Use the received data to configure the electronic voting machine
            if (data[0][0] === 'a') {
                // Hide the RG field
                document.getElementById('idcpf').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function cargaInicial() {
   const res =  await fetch("http://localhost:3000/cargainicial")

   return res.json()  
}async function votoFunction(dadosVotacao) {
    // Desabilitar botões e campos da tela
    const buttons = document.querySelectorAll("button");
    const inputs = document.querySelectorAll("input");
    buttons.forEach((button) => {
        button.disabled = true;
    });
    inputs.forEach((input) => {
        input.disabled = true;
    });

    try {
        const response = await fetch("http://localhost:3000/voto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosVotacao),
        });

        const data = await response.json();

        // Exibir mensagem retornada pela chamada do Endpoint
        const mensagemElement = document.getElementById("idMensagem");
        mensagemElement.innerText = data.mensagem;

        if (response.status === 200) {
            // Exibir mensagem por 2 segundos
            setTimeout(() => {
                mensagemElement.innerText = "";
                // Habilitar botões e campos da tela
                buttons.forEach((button) => {
                    button.disabled = false;
                });
                inputs.forEach((input) => {
                    input.disabled = false;
                });
            }, 2000);
        } else if (response.status === 500) {
            // Exibir mensagem por tempo indeterminado e destacar em vermelho
            mensagemElement.style.color = "red";
        }
    } catch (error) {
        console.error(error);
    }
}
