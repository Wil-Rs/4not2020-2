const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {
        type: String,
        // é um dado obrigatorio ou requirido.
        required: true
    },
    ementa: {
        type: String,
        required: true
    },
    carga_horaria: {
        type: Number,
        required: true,
        // limite nao pode < 4 ou > 80
        min: 4,
        max: 80
    },
    nivel: {
        type: String,
        required: true,
        // enum conjunto de respostas aceitas....
        enum: ['Basico', 'Intermediário', 'Avançado']
    },
    valor_curso: {
        type: Number,
        required: true,
        default: 450,   // Valor assumido se nao for informado
        // o minimo do valor do curso é 50 reais..
        min: 50
    }
})

/*
    parametros do metodo mongoose.model()
    1° -> Nome do modelo (sempre igual o nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da colecao (collection) em que os objetos criados a partir do modelo serao armazendos no MongoDB
*/

module.exports = mongoose.model('Curso', esquema, 'cursos')