const { ProducerModel } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/producers/:id', (req, res) => {
        ProducerModel.findByPk(req.params.id).then(ProducerToBeRemove => {
            const deletedProducer = ProducerToBeRemove;
            ProducerModel.destroy({
                where: { id: ProducerToBeRemove.id }
            }).then(_ => {
                    const message = `Le pokémon avec l'identifiant n°${deletedProducer.id} a bien été supprimé.`
                    res.json({message, data: deletedProducer })
                })
        })
    })
}