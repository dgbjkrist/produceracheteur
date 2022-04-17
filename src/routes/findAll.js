const { ProducerModel } = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/producers', (req, res) => {
        ProducerModel.findAll().then(r => {
            const message = 'La liste des producteurs.'
            res.json({message, data: r})
        }).catch(error => console.log(error))
    })
}
