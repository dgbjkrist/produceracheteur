const {ProducerModel} = require('./../db/sequelize')
const {ValidationError} = require("sequelize");

module.exports = (app) => {
    app.put('/api/producers/:id', (req, res) => {
        const id = req.params.id
        ProducerModel.findByPk(id)
            .then(producer => {
                if (producer === null) {
                    const message = `Aucun producteur trouvé avec l'identifiant ${id}`
                    return res.status(404).json({message})
                }
                return producer.update(req.body)
                    .then(_ => {
                            const message = `le producteur ${producer.name} a été mis a jour`
                            res.json({message, data: producer})
                        }
                    )
                }
            )
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = 'La modification du producteur a échoué, Veuillez ressayé'
                res.status(500).json({message, data: error})
            })
    })
}