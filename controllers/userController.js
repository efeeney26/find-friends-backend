const User = require('../models/user')

exports.user_list = (req, res) => {
    User.find( (err, bookList) => {
        if (err) {
            console.error(err)
            res.status(500).send({ error: err })
        } else {
            res.send(bookList)
        }
    })
}

exports.insert_data = (req, res) => {
    User.insertMany(req?.body, (err) => {
        if (err) {
            console.error(err)
            res.status(500).send({ error: err })
        } else {
            res.send('Data inserted successfully')
        }
    })
}

exports.delete_data = (req, res) => {
    User.deleteMany({}, (err) => {
        if (err) {
            console.error(err)
            res.status(500).send({ error: err })
        } else {
            res.send('Data removed successfully')
        }
    })
}

exports.user = (req, res) => {
    User.findOne({ status: 'not found' }, (err, user) => {
        if (err) {
            console.error(err)
            res.status(500).send({ error: err })
        } else {
            res.send(user)
        }
    })
}

exports.set_data = (req, res) => {
    User.findOneAndUpdate(
        { name: req?.params?.username },
        {
            $set: {
                coordinates: req?.body?.coordinates || '',
                message: req?.body?.message || '',
                photo: req?.body?.photo || ''
            },
        },
        {
            useFindAndModify: false
        },
        (err) => {
            if (err) {
                console.error(err)
                res.status(500).send({ error: err })
            } else {
                res.send('Данные успешно добавлены! Ты молодец!')
            }
        }
    )
}

exports.set_status = (req, res) => {
    User.findOneAndUpdate(
        { name: req?.params?.username },
        { $set: { status: req?.body?.status || '' } },
        {
            useFindAndModify: false
        },
        (err) => {
            if (err) {
                console.error(err)
                res.status(500).send({ error: err })
            } else {
                res.send('Status changed successfully')
            }
        }
    )
}
