const {ProducerModel} = require('./../db/sequelize')

module.exports = (app) => {
    app.put('/api/producers/:id', (req, res) => {
        const id = req.params.id
        ProducerModel.findByPk(id).then(
            r => {
                r.update(req.body).then(
                    _ => {
                        const message = `le producteur ${r.name} a été mis a jour`
                        res.json({message, data: r})
                    }
                )
            }
        )
    })
}