const mongoose = require('mongoose')

module.exports = uri => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // Quando conectado com sucesso imprime essa menssagem no console...
    mongoose.connection.on('connected', () => {
        console.log(' =======> Mongoose! Conectado com sucesso ao servidor...')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('\n\n\n ===> Mongoose! Desconectado do servidor...')
    })

    // Captura um sinal de encerramento (SIGIT), ctrl + c
    process.on('SIGINT', () => {
        mongoose.connection.close( () => {
            console.log(' **** Mongoose! Desconectado pelo termino da aplicacao.... ****')
            // 0 indica que a finalizacao ocorreu sem erros
            process.exit(0)
        })
    })
}