import { buscarUsuarioID, deletarUsuarioId,buscarUsuarioIndexID, getUsuarios } from '../database/conexao.js'

class UsuarioController{

    
     //Lista Tudo
    index(req, res) { 
        res.status(200).send(getUsuarios())
    }

    
     //Listar por Id
    show(req, res){ 
        let usuario = buscarUsuarioID(req.params.id)
        res.status(200).json(usuario)
    }

    
     //Salvar Novo Registro
    store(req, res){
        getUsuarios().push(req.body)//fazer a conversão para formato json
        res.status(201).send("Usuário cadastrado com sucesso!")
    }
    
    
    //Atualizar Registro 
    update(req, res){
        let indexUsuario = buscarUsuarioIndexID(req.params.id);
        let usuarios = getUsuarios();
        usuarios[indexUsuario].email = req.body.email;
        usuarios[indexUsuario].senha = req.body.senha;
        res.status(200).json(usuarios[indexUsuario])
        
    };
    


    /**
     * Deletar Registro
     */
    delete(req, res){
        let indexUsuario = deletarUsuarioId(req.params.id); 
        getUsuarios().splice(indexUsuario, 1)
        res.status(200).send(`Usuario ${req.params.id} excluido com sucesso`);
    };


}

//padrao Singleton (Design Patterns)
export default new UsuarioController