import express from 'express'
import authRouter from './routes/authRoutes.js'


const app = express()

//Body parsers
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));

//Application Routes
app.use('/api',authRouter)


//Middlewares -> error handlers
app.use((req,res)=>{
    res.status(404).json({
        success : false,
        message : `Route not found: ${req.method} ${req.originalUrl}`
    })
})


app.use((error,req,res,next)=>{
    console.log(error)

    res.status(error.status || 500).json({
        success : false,
        message : error.message || "Internal server error"
    })
})



export default app