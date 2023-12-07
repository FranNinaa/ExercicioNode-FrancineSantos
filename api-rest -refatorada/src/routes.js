import { Router } from "express"
import UsuarioController from "./app/controllers/UsuarioController.js"
const router = Router()


//listar todo os cadastros (read)
router.get("/usuario", UsuarioController.index)
router.get("/usuario/:id", UsuarioController.show) 

//cadastrar um novo usuario (create)
router.post("/usuario", UsuarioController.store)

//alterar usuario (update)
router.put('/usuario/:id', UsuarioController.update)

//deletar usuario (delete)
//para deletar tem q saber o indice do dado para esta fazendo a exclusão
router.delete("/usuario/:id", UsuarioController.delete)

export default router