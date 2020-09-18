const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {type: String, required: true},
    capacidade: {type: Number, default: 20},
    recursos_didaticos: {type: String}
})

/*
    parametros do metodo mongoose.model()
    1° -> Nome do modelo (sempre igual o nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da colecao (collection) em que os objetos criados a partir do modelo serao armazendos no MongoDB
*/

module.exports = mongoose.model('SalaAula', esquema, 'salas_aulas')