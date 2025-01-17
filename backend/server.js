// const express = require('express')
// const dotenv = require('dotenv')
// const products = require('./data/products')
//above is common js, below is ES2015
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

const config = dotenv.config()

if(config.error){
  throw config.error
}

console.log(process.env.JWT_SECRET)
connectDB()

const app = express()

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//PayPal
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

//making the uploads folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//error handling middleware - 404 error
app.use(notFound)
//error handling middleware - invalid ID etc
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
