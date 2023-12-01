
//O módulo express retorna uma função que instancia o express
const express = require("express") 
const conversorJson = require("body-parser")
const cors = require("cors")

//A função express cria uma instância de todo o framework express em app
const app = express() 

//middleware
app.use(conversorJson.urlencoded({ extended: false }))//padrão
app.use(conversorJson.json())//padrão

//função call back
app.use((_, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*")//pode processar qualquer rota
  //resp.header("Access-Control-Allow-Origin", "http://localhost:8080") só essa rota q tem permisão de acesso 
  app.use(cors())
  next()
})


app.post("/cadastro", function (req, res) {
  const { body } = req

  res.json({ body })
})

//Cria o Servidor com o express
const porta = 3001
app.listen(porta, function () {
  console.log(`Servidor Rodando na porta ${porta}`)
})
