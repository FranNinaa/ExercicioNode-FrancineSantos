import express from "express"
import UsuarioController from "./app/controllers/UsuarioController.js"

//invoca a função express
const app =  express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())


//listar todo os cadastros (read)
app.get("/usuario", UsuarioController.index)
app.get("/usuario/:id", UsuarioController.show) 

//cadastrar um novo usuario (create)
app.post("/usuario", UsuarioController.store)

//alterar usuario (update)
app.put('/usuario/:id', UsuarioController.update)

//deletar usuario (delete)
//para deletar tem q saber o indice do dado para esta fazendo a exclusão
app.delete("/usuario/:id", UsuarioController.delete)

export default app

//obs: mais fácil quardar um array de arquivo



