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

async function cargainicial() {
    const resp = await fetch("http://localhost:3000/cargainicial");
    return resp.json();
}