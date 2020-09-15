const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: { type: String, required: true },
    formacao: { type: String, required: true },
    data_nascimento: { type: Date, required: true },
    // indice unico: impede a duplicidade de CPFs no cadastro
    cpf: { type: String, required: true, index: { unique: true } },
    rg: { type: String, required: true },
    valor_hora_aula: { type: Number, required:true, min: 15.0, default: 20.75 },
    endereco: { type: String, required: true },
    telefone: { type: String, required: true },
    // indice unico: impede a duplicidade de emails no cadastro
    email: { type: String, required: true, index: { unique: true } } 
})

/*
    parametros do metodo mongoose.model()
    1° -> Nome do modelo (sempre igual o nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da colecao (collection) em que os objetos criados a partir do modelo serao armazendos no MongoDB
*/

module.exports = mongoose.model('Professor', esquema, 'professores')