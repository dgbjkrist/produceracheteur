const { ProducerModel } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/producers/:id', (req, res) => {
        ProducerModel.findByPk(req.params.id)
            .then(producerToBeRemove => {
                if (producerToBeRemove === null) {
                    const message = `Aucun producteur trouvé avec l'identifiant ${id}`
                    return res.status(404).json({message})
                }
                const deletedProducer = producerToBeRemove;
                return ProducerModel.destroy({
                    where: { id: producerToBeRemove.id }
                })
                    .then(_ => {
                        const message = `Le pokémon avec l'identifiant n°${deletedProducer.id} a bien été supprimé.`
                        res.json({message, data: deletedProducer })
                    })
            })
            .catch(error => {
                const message = 'Une erreur est survenue pendant l\'operation, Veuillez ressayé'
                res.status(500).json({message, data: error})
            })
    })
}