var candidatos;


numeroCandidato = document.getElementById("idNumeroCandidato")

numeroCandidato.onchange = function() {
   console.log(numeroCandidato.value); 

    let cand = candidatos.filter((value)=>{
        return value.numeroCandidato == numeroCandidato.value
    })

    if (cand.length == 1) {
        document.getElementById("idNomeCandidato").innerText = cand[0].nomeCandidato
        document.getElementById("idFoto").src = cand[0].urlFoto
        document.getElementById("idNomeCandidato").alt = cand[0].nomeCandidato
    }else{
        document.getElementById("idNomeCandidato").innerText = "Candidato"
        document.getElementById("idFoto").src = "view/img/presidentDay.png"
        document.getElementById("idFoto").alt = "imagem do candidato"
    }
    

} 

async function cargaInicial() {
   const res =  await fetch("http://localhost:3000/cargainicial")

   return res.json()  
}