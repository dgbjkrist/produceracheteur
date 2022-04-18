const {ProducerModel} = require('./../db/sequelize')

module.exports = (app) => {
    app.get('/api/producers/:id', (req, res) => {
        const id = req.params.id
        ProducerModel.findByPk(id)
            .then(producer => {
                if (producer === null) {
                    const message = `Aucun producteur trouvé avec l'identifiant ${id}`
                    return res.status(404).json({message})
                }
                const message = 'un producteur a été trouvé'
                res.json({message, data: producer})
            })
            .catch(error => {
                const message = 'Une erreur est survenue lors du traitement de la demande, Veuillez ressayé'
                res.status(500).json({message, data: error})
            })
    })
}