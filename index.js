const express = require('express')
const app = express()
const port = 8080

const users = require('./users')

app.use('/api', users)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
