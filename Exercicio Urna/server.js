const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "view")));
//app.use(express.static(path.join(__dirname + "img")));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.get("/cargainicial", async (req, res) => {
    try {
        // ler arquivo config.csv
        const candidatosData = await fs.readFile("config.csv", "utf-8");

        // "quebrar" arquivo em um array de usuario
        const candidatos = candidatosData.split("\r\n");

        // "quebrar" a linha (elemento do array item 2) em dados do candidato (array)
        const candidatosDetails = [];
        candidatos.forEach(candidato => {
            let candidatoDados = candidato.split(",");
           
            let candidatoObj = {
                tipoEleicao: candidatoDados[0],
                numeroCandidato: candidatoDados[1],
                nomeCandidato: candidatoDados[2],
                urlFoto: candidatoDados[3]
            };

            candidatosDetails.push(candidatoObj);
        });

        // responder array de candidatos
        res.send(candidatosDetails);
    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        res.status(500).send("Erro interno do servidor");
    }
});




app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});
