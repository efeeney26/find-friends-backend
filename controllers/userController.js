const User = require('../models/user')

exports.user_list = (req, res, next) => {
    User.find( (err, bookList) => {
        if (err) {
            return next(err)
        }
        res.send(bookList)
    })
}
