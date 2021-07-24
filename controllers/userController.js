const User = require('../models/user')
const data = require('../db/data.json')

exports.user_list = (req, res) => {
    User.find( (err, bookList) => {
        if (err) {
            console.error(err)
            throw new Error(err)
        } else {
            res.send(bookList)
        }
    })
}

exports.insert_data = (req, res) => {
    User.insertMany(req?.body?.data || data, (err) => {
        if (err) {
            console.error(err)
            throw new Error(err)
        } else {
            res.send('Data inserted successfully')
        }
    })
}

exports.delete_data = (req, res) => {
    User.deleteMany({}, (err) => {
        if (err) {
            console.error(err)
            throw new Error(err)
        } else {
            res.send('Data removed successfully')
        }
    })
}

exports.user = (req, res) => {
    User.findOne({ status: 'not found' }, (err, user) => {
        if (err) {
            console.error(err)
            throw new Error(err)
        } else {
            res.send(user)
        }
    })
}

exports.set_coordinates = (req, res) => {
    User.findOneAndUpdate(
        { name: req?.params?.username },
        { $set: { coordinates: req?.body?.coordinates || '' } },
        {
            useFindAndModify: false
        },
        (err) => {
            if (err) {
                console.error(err)
                throw new Error(err)
            } else {
                res.send('Coordinates added successfully')
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
                throw new Error(err)
            } else {
                res.send('Status changed successfully')
            }
        }
    )
}
