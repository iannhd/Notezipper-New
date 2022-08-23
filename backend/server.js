require('dotenv').config()
const express = require('express')
const app = express()
const notes = require('./data/notes')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoute')
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

// console.log(process.env, "====> iki meneh");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDB()

app.get('/', (req,res)=>{
    res.send("halo wulink")
})

app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${PORT}`))