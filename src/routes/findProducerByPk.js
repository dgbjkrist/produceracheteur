const {ProducerModel} = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/producers/:id', (req, res) => {
        ProducerModel.findByPk(req.params.id)
            .then(r => {
                const message = 'un producteur a été trouvé'
                res.json({message, data: r})
            })
    })
}