const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    ementa: {
        type: String,
        required: true
    },
    carga_horaria: {
        type: Number,
        required: true,
        min: 4,
        max: 80
    },
    nivel: {
        type: String,
        required: true,
        enum: ['Básico', 'Intermediário', 'Avançado']
    },
    valor_curso: {
        type: Number,
        required: true,
        default: 450,    // Valor assumido se não for informado
        min: 50
    }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo (sempre igual a nome do arquivo)
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do 
        modelo serão armazenados no MongoDB
*/
module.exports = mongoose.model('Curso', esquema, 'cursos')