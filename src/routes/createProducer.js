const { ProducerModel } = require('./../db/sequelize')
const {ValidationError} = require("sequelize");

module.exports = (app) => {
    app.post('/api/producers', (req, res) => {
        ProducerModel.create(req.body)
            .then(producer => {
                const message = `Un producteur ${producer.name} à été ajouté`
                res.json({message, data: producer})
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'Le producteur n\'a pas été ajouté, Veuillez ressayé'
                res.status(500).json({message, data: error})
            })
    })
}