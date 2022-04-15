let producers = require('./mock-producersbuyers')
const {success, getUniqId} = require('./helper')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const express = require('express')
const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('hello djegba et blalblalblaaaaa')
})

app.get('/api/producers', (req, res) => {
    //const producers = producers.all()
    const message = `nous avons retourner ${producers.length} producteurs`
    res.json(success(message, producers))
})

app.get('/api/producers/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let producer = producers.find(producer => producer.id === id)
    let message = `vous avez demandé le producteur ${producer.name}`
    //res.send(`vous avez demandé le producteur ${producer.name}`)
    res.json(success(message, producer))
})

app.post('/api/producers', (req, res) => {
    const producer = {...req.body, ...{id: getUniqId(producers), created: new Date()}}
    producers.push(producer)
    const message = `le producer ${producer.name} a ete ajouté`
    res.json(success(message, producer))
})

app.put('/api/producers/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let producerUpdated = {...req.body, id: id}
    producers = producers.map(producer => {
        return producer.id === id ? producerUpdated : producer
    })

    const message = `le producteur ${producerUpdated.name} a bien été modifié`

    res.json(success(message, producerUpdated))
})

app.listen(port, () => console.log(`producteuracheteur running on port http://localhost:${port}`))