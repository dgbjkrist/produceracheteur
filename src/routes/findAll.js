const { ProducerModel } = require('./../db/sequelize')
const authJwt = require('../auth/auth_jwt')

module.exports = (app) => {
    app.get('/api/producers', authJwt, (req, res) => {
        ProducerModel.findAll().then(r => {
            const message = 'La liste des producteurs.'
            res.json({message, data: r})
        }).catch(error => {
            const message = `La liste des producteurs n'a pas pu être recup, veuillez ressayer`
            res.status(500).json({message, data: error})
        })
    })
}
