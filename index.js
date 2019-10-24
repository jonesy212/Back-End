const express = require('express')
const server = express()

//IMPORT DEFAULT ROUTES
const primaryRouter = require('./api/auth/auth-router')
const userRouter = require('./api/private/users/user-router')
const productRouter = require('./api/private/products/products-router')
const orderRouter = require('./api/private/orders/order-router')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

//INIT SERVER
server.use(cors())
server.use(helmet())
server.use(express.json())

//ROUTER

server.use('/api/farms', primaryRouter)
server.use('/api/orders', orderRouter)
server.use('/api/users', userRouter)
server.use('/api/products', productRouter)

// server.use('/api/orders', order)

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));

