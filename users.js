const router = require('express').Router()

router
    .get('/users', (req, res) => {
        res.send({
            kek: 'lol'
        })
    })

module.exports = router
