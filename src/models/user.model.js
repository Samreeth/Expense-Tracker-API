import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : [true,'Name is required'],
            trim : true,
            minLength : [2,'Name must be at least 2 characters']
        },
        email :{
            type : String,
            required : [true,'Email is required'],
            unique : true,
            lowercase : true,

        },
        password : {
            type : String,
            required : [true,'Password required'],
            minLength : [6,'Password must be at least 6 characters']
        }


    }
,{timestamps : true})

const User = mongoose.model('User',userSchema)

export default User

