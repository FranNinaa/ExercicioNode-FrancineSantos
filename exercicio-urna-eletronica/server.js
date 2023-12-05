import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "view")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// método get carga inicial
app.get("/cargainicial", async (req, res) => {
  try {
    // ler arquivo config.csv
    const candidatosData = await fs.readFile("config.csv", "utf-8");

    // "quebrar" arquivo em um array de usuario
    const candidatos = candidatosData.split("\r\n");

    // "quebrar" a linha (elemento do array item 2) em dados do candidato (array)
    const candidatosDetails = []
    candidatos.forEach(candidato =>{
        let candidatoDados = candidato.split(",")

        let candidatoObj = {
            tipoEleicao: candidatoDados[0],
            numeroCandidato : candidatoDados[1], 
            nomeCandidato: candidatoDados[2],
            urlFoto: candidatoDados[3]
        }
        candidatosDetails.push(candidatoObj)
    })    
    
    //4. Responder o array de candidatos
    res.send(candidatosDetails)



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
