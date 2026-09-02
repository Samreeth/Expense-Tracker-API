import 'dotenv/config'
import app from './src/app.js'
import connectDb from './src/db/database.js'

const startServer = async ()=>{
    try{
         await connectDb()
         app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)

         })

    }catch(error){
        console.log('Error in starting ther server',error)
    }
}

startServer();