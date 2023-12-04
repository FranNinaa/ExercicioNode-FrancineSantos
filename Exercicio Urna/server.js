const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "view")));
//app.use(express.static(path.join(__dirname + "img")));


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

app.post('/voto', (req, res) => {
    try {
        const { CPF, numeroCandidato } = req.body;

        // Gerar timestamp no formato desejado (usei milissegundos neste exemplo)
        const timestampVoto = new Date().toISOString().replace(/[-:.]/g, '');

        // Gravar os dados no arquivo CSV
        const dado = `${CPF || ''},${numeroCandidato},${timestampVoto}\n`;
        fs.appendFile('votacao.csv', dado);

        res.status(200).json({
            Status: '200',
            mensagem: 'Voto Registrado Com sucesso',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            Status: '500',
            mensagem: 'Erro ao registrar voto, contate o administrador do sistema',
        });
    }
});

app.get('/apuracao', (req, res) => {
    try {
        // Ler o conteúdo do arquivo votacao.csv
        const votosCsv = fs.readFileSync('votacao.csv', 'utf-8');
        
        // Separar linhas e processar votos
        const linhas = votosCsv.trim().split('\n');
        const apuracao = {};

        // Contabilizar votos para cada candidato, votos brancos e nulos
        linhas.forEach((linha) => {
            const [CPF, numeroCandidato, timestampVoto] = linha.split(',');

            if (!numeroCandidato) {
                // Voto em branco
                apuracao['Brancos'] = (apuracao['Brancos'] || 0) + 1;
            } else if (numeroCandidato === '11') {
                // Voto nulo (exemplo: número do candidato igual a 11)
                apuracao['Nulos'] = (apuracao['Nulos'] || 0) + 1;
            } else {
                // Voto para candidato específico
                apuracao[numeroCandidato] = (apuracao[numeroCandidato] || 0) + 1;
            }
        });

        // Converter para um array ordenado em ordem decrescente pela quantidade de votos
        const resultadoApuracao = Object.entries(apuracao)
            .map(([numeroCandidato, qtdVotos]) => ({
                numeroCandidato,
                qtdVotos: parseInt(qtdVotos),
            }))
            .sort((a, b) => b.qtdVotos - a.qtdVotos);

        // Adicionar informações adicionais como nome e URL da foto do candidato
        const candidatos = [
            { numeroCandidato: '11', nomeCandidato: 'Voto Nulo', urlFotoCandidato: '' },
            // Adicionar mais candidatos conforme necessário
        ];

        const resultadoFinal = resultadoApuracao.map(({ numeroCandidato, qtdVotos }) => {
            const candidato = candidatos.find((c) => c.numeroCandidato === numeroCandidato) || {};
            return [
                numeroCandidato,
                qtdVotos,
                candidato.nomeCandidato || 'Voto em Branco',
                candidato.urlFotoCandidato || '',
            ];
        });

        res.status(200).json(resultadoFinal);
    } catch (error) {
        console.error('Erro ao processar apuração:', error);
        res.status(500).json({
            Status: '500',
            mensagem: 'Erro ao processar apuração, contate o administrador do sistema',
        });
    }
});


app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});