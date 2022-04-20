let producers = require('./mock-producersbuyers')
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    'producteuracheteur',
    'admin',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3336
    }
)

sequelize.authenticate()
    .then(_ => console.log('la connection a la base de données a été succes'))
    .catch(error => console.error('error'+error))

const ProducerModel = require('./../models/producer')(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true})
        .then(_ => {
            console.log("All models were synchronized successfully.")

            producers.map(producer => {
                ProducerModel.create({
                    name: producer.name,
                    hp: producer.hp,
                    cp: producer.cp,
                    picture: producer.picture,
                    types: producer.types
                }).then(kokora => console.log(kokora.name))
            })
        })
}

module.exports = {initDb, ProducerModel}