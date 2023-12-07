
//mockup = vai mocapear os dados - "maquete modelo"
const usuarios = [
    { id: 1, email: "luiz@email.com", senha: "admin" },
    { id: 2, email: "maria@email.com", senha: "admin" },
    { id: 3, email: "francine@email.com", senha: "admin" }
]

//buscar um usuario pelo seu id
function buscarUsuarioID(id) {
    return usuarios.find(usuario => usuario.id == id);
}

//buscar um usuario pelo seu id
function buscarUsuarioIndexID(id) {
    return usuarios.findIndex(autor => autor.id == id)
}


//função para buscar o id para esta fazendo a exclusão
function deletarUsuarioId(id) {
    return usuarios.findIndex(user => user.id == id);
}

function getUsuarios() {
    return usuarios;
}

export { buscarUsuarioID, deletarUsuarioId,buscarUsuarioIndexID, getUsuarios }