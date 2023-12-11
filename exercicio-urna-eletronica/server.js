import express from 'express';
import { createReadStream, appendFile, readFileSync } from 'fs';
import csv from 'csv-parser';

const app = express();

app.get('/cargainicial', (req, res) => {
  const results = [];

  createReadStream('config.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.post('/voto', (req, res) => {
  const { RG, numeroCandidato, timestampVoto } = req.body;

  const voto = `${RG},${numeroCandidato},${timestampVoto}\n`;

  appendFile('votacao.csv', voto, (err) => {
    if (err) {
      res.status(500).json({
        Status: '500',
        mensagem: 'Erro ao registrar voto, contate o administrador do sistema'
      });
    } else {
      res.status(200).json({
        Status: '200',
        mensagem: 'Voto Registrado Com sucesso'
      });
    }
  });
});


app.get('/apuracao', (req, res) => {
  const votos = readFileSync('votacao.csv', 'utf-8').split('\n');
  const candidatos = {};
  let votosBrancos = 0;
  let votosNulos = 0;

  votos.forEach((voto) => {
    const [RG, numeroCandidato] = voto.split(',');

    if (numeroCandidato === '') {
      votosBrancos++;
    } else if (numeroCandidato === 'Nulo') {
      votosNulos++;
    } else {
      if (candidatos[numeroCandidato]) {
        candidatos[numeroCandidato].qtdVotos++;
      } else {
        candidatos[numeroCandidato] = {
          qtdVotos: 1,
          nomeCandidato: '',
          urlFotoCandidato: ''
        };
      }
    }
  });

  const apuracao = [];

  for (const numeroCandidato in candidatos) {
    const { qtdVotos } = candidatos[numeroCandidato];
    apuracao.push([numeroCandidato, qtdVotos, '', '']);
  }

  apuracao.push(['Brancos', votosBrancos, '', '']);
  apuracao.push(['Nulos', votosNulos, '', '']);

  apuracao.sort((a, b) => b[1] - a[1]);

  res.json(apuracao);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});