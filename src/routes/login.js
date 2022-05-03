const { UserModel } = require('./../db/sequelize')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const privateKey = require('./../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        UserModel.findOne({
            where: {email: req.body.username}
        }).then(user => {
            if(!user) {
                const message = 'Utilisateur non trouvé';
                return res.status(404).send({message})
            }
            const isValidPassword = bcrypt.compareSync(req.body.password, user.password)
            if (!isValidPassword) {
                const message = 'Password not valid';
                return res.status(401).send({message})
            }

            const token = jwt.sign({userId: user.id}, privateKey.secret, {expiresIn: 10}, undefined);

            const message = 'Utilisateur connecté avec succes';
            return res.status(200).send({message, data: user, token})
        }).catch(error => {
            const message = 'Un probleme est survenu lors du traitement'
            res.status(500).send({ message, data: error });
        })
    })
}