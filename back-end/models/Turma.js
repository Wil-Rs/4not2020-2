const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: { type: String, required: true },
    data_inicial: { type: Date, required: true },
    data_final: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(valor){
                return valor >= this.data_inicial
            },
            message: () => 'A data final deve ser maior ou igual a data incial.'
        }
    },
    dias_semanas: [{
        type: String,
        required: true,
        enum: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

    }],
    // tipos de dado apenas a parte de horas de uma data
    // sao manipulados mais facilmente como string
    horario_inicial: { type: String, required: true },
    horario_final: { 
        type: String, 
        required: true,
        
    },
    curso: { type: mongoose.ObjectId, ref: 'Curso', required: true },
    professor: { type: mongoose.ObjectId, ref: 'Professor', required: true },
    sala: { type: mongoose.ObjectId, ref: 'SalaAula', required: true }
})

/*
    parametros do metodo mongoose.model()
    1° -> Nome do modelo (sempre igual o nome do arquivo)
    2° -> Estrutura (esquema) do modelo
    3° -> Nome da colecao (collection) em que os objetos criados a partir do modelo serao armazendos no MongoDB
*/

module.exports = mongoose.model('Turma', esquema, 'turmas')