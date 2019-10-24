const privateRoute = require('express').Router()
const farmer = require('./users/user-router')

privateRoute.use('/', farmer)

privateRoute.get('/', (req, res) => {
    res.status(200).json({msg:req.body.user})
})

module.exports = privateRoute