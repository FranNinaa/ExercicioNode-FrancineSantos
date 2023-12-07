import UsuarioRepository from "../repositories/UsuarioRepository.js"


class UsuarioController {

    //Salvar Novo Registro
    store(req, res) {
        UsuarioRepository.create(req.body,)
        res.status(201).send("Usuario cadastrado com sucesso!!")
    }

    //Lista Tudo
    index(req, res) {
        let usuarios = UsuarioRepository.findAll()
        res.status(200).send(usuarios)
    }


    //Listar por Id
    //aqui recebe esse usuario
    show(req, res) {
        let usuario = UsuarioRepository.findById(req.params.id)
        res.status(200).json(usuario)
    }





    //Atualizar Registro 
    //chama o usuario e retorna ele para o front
    update(req, res) {
        let usuario = UsuarioRepository.update(req.params.id, req.body)
        res.status(200).json(usuario)

    };



    /**
     * Deletar Registro
     */
    delete(req, res) {
        UsuarioRepository.delete(req.params.id)
        res.status(200).send(`Usuario ${req.params.id} excluido com sucesso`);
    };


}

//padrao Singleton (Design Patterns)
export default new UsuarioController