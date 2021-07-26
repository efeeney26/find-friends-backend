const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

router
    .get('/', userController.user_list)

    .post('/insert', userController.insert_data)

    .delete('/delete', userController.delete_data)

    .get('/user', userController.user)

    .put('/set-data/:username', userController.set_data)

    .put('/set-status/:username', userController.set_status)

module.exports = router
