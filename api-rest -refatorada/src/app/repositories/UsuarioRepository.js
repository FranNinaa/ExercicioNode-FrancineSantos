import { buscarUsuarioID, deletarUsuarioId, buscarUsuarioIndexID, getUsuarios } from '../database/conexao.js'

class UsuarioRepository {

    create(usuario) {
        getUsuarios().push(usuario)
    }

    findAll() {//como se fosse uma função pode ter retorno
       return getUsuarios()
    }

    findById() {//retorna 1 usuario
        buscarUsuarioID(id)
    }

    update(id, usuario) {
        //tem que passar 2 paramedros id e o usuario
        let indexUsuario = buscarUsuarioIndexID(id);
        let usuarios = getUsuarios();
        usuarios[indexUsuario].email = usuario.email;
        usuarios[indexUsuario].senha = usuario.senha;

        return usuarios[indexUsuario]
    }

    delete(id) {
        //busca o indice e com isso faz a exclusão
        let indexUsuario = deletarUsuarioId(id); 
        getUsuarios().splice(indexUsuario, 1)
    }

}

export default new UsuarioRepository()