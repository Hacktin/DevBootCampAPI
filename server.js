

const express=require('express')
const dotenv=require('dotenv')
//Requirment packages

const bootcamp=require('./routes/bootcamp')
//routes


const logger=require('./middleware/logger')
const morgan=require('morgan')
//Middlewares


const ConnectionDb=require('./config/db')

dotenv.config({path:'./config/config.env'})

const app=express()
const PORT=process.env.PORT
//server components

ConnectionDb()


if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use('/api/v1/bootcamps',bootcamp)
//use the routes with middleware

const server=app.listen(PORT,(error)=>{
    if(error){
        console.log(error)
    }
})

process.on('unhandledRejection',(err,promise)=>{
    console.log(err)
    server.close(()=>process.exit(1))
})



