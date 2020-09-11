/*
    Operacaoes basicas sobre dados

    1) CREATE ( cria ou insercao )
        cria um novo objeto dentro do banco de dados

    2) RETRIEVE ( recuperar ou listar )
        Obrter de volta um ou mais objetos preexistente no banco de dados

    3) UPDATE
        Atualizar os dados de um objeto preextente no banco de dados

    4) DELETE
        Exclusao de um objetos do banco de dados

    (C)reate + (R)etrieve + (U)pdate + (D)elete = Sigla CRUD

    ==================================================================================

    Verbos do protocolo HTTP

    Verbo                              Operacao
    POST                               CREATE
    GET                                RETRIEVE
    PUT                                UPDATE
    DELETE                             DELETE
*/

// Controller é um conjunto de funcoes associadas as operacoes sobre dados

const Curso = require('../models/Curso')

const controller = {} // Objecto vazio

// Operacao CREATE, funcao novo()

// requisicao e resposta
controller.novo = async (req, res) => {
    // Usa os dados que chegam dentro do body da requisicao
    // e os envia o DB para a criacao de um novo objeto
    try {
        await Curso.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(erro) {
        console.log(erro)
        // HTTP 500: Intenal Server Error
        res.status(500).send(erro)
    }
    
}

//Operacao Retrieve (all), funcao lista
controller.listar = async (req, res) => {
    try{
        let dados = await Curso.find() //traz todos os cursos cadastrados.
        res.status(200).send(dados)
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
} 

controller.obterUm = async (req, res) => {
    // capturando o parametro id da url
    try{
        const id = req.params.id
        let obj = await Curso.findById(id)

        // o objeto existe e foi encontrado
        if(obj)res.send(obj) // http 200
        //nao encontrado
        else res.status(404).end() // http 404: not found
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller