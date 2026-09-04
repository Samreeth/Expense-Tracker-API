import mongoose from 'mongoose'

const expenseSchema  = new mongoose.Schema(
    {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : [true,"User ID is required"]

        },
        description : {
            type : String,
            required : [true,'Expense description is required'],
            trim : true,
            maxLength : [200,'Description cannot exceed 200 characters'],
        },
        amount : {
            type : Number,
            required :[true,'Amount is required'],
            min : [0.01,'Amount must be greater than 0'],
        },
        category : {
            type : String,
            enum : ['food','transport','entertainment','utilities','healthcare','shopping','other'],
            default : 'other'
        },
        date : {
            type : Date,
            default : Date.now,
            trim : true,
            maxLength : [500,'Notes cannot exceed 500 characters']
        }
    }
,{timestamps: true})

const Expense  =  mongoose.model("Expense",expenseSchema);

export default Expense