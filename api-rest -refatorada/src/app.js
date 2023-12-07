//no app as rotas que esta criando ñ deve esta no app , aki cria o express e gerencia midware
import express from "express"
import router from "./routes.js"


//invoca a função express
const app =  express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)

export default app

//obs: mais fácil quardar um array de arquivo



