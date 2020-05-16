const express = require('express')
const app = express()


const port = 3000;

app.get('/', (req, res) => {
    res.send('Status:' + res.statusCode + ' Message: Get')
})
app.get('/id/:id', (req, res) => {
    res.send('Status:' + res.statusCode + ' Message ID:' + req.params.id)
})
app.post('/', (req, res) => {
    res.send('Status:' + res.statusCode + ' Message: Post')
})
app.put('/', (req, res) => {
    res.send('Status:' + res.statusCode + ' Message: put ')
})
app.delete('/', (req, res) => {
    res.send('Status:' + res.statusCode + ' Message: delete')
})




app.listen(port, () => {
    console.log('App running localhost:' + port);
})




