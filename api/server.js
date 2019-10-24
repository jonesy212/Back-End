const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

//IMPORT DEFAULT ROUTES
const primaryRouter = require('../api/auth/auth-router')
const userRouter = require('../api/private/users/user-router')
const productRouter = require('../api/private/products/product-router')
const orderRouter = require('../api/private/orders/order-router')
const farmRouter = require('../api/private/farms/farms-router')

const server = express()

//INIT SERVER
server.use(cors())
server.use(helmet())
server.use(express.json())

//ROUTERs

server.use('/api/farms', primaryRouter)
server.use('/api/orders', orderRouter)
server.use('/api/users', userRouter)
server.use('/api/farm/products', productRouter)
server.use('/api/farm', farmRouter)

// server.use('/api/orders', order)

server.get('/', (req, res) => {
    res.status(200).json({api: 'up'})
})

module.exports = server