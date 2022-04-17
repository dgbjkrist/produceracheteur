const { ProducerModel } = require('./../db/sequelize')

module.exports = (app) => {
    app.post('/api/producers', (req, res) => {
        ProducerModel.create(req.body)
            .then(r => {
                const message = `Un producteur ${r.name} à été ajouté`
                res.json({message, data: r})
            })
    })
}