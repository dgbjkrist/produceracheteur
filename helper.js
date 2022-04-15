exports.success = (message, data) => {
    return {message, data}
}

exports.getUniqId = (producers) => {
    const producersId = producers.map(producer => producer.id)
    const maxId = producersId.reduce((a, b) => Math.max(a, b))
    return parseInt(maxId + 1)
}