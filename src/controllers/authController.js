import User from "../models/user.model.js"
import config from '../config/config.js'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'



export async function register(req,res){

    const {username,email,password} = req.body;

    if (!username || !email || !password) {
           return res.status(400).json({
           message: "Username, email, and password are required",
          });
     }
     
    //check if user exists;
    const isAlreadyRegistered  = await User.findOne({
        $or:[{username}, {email}]
    })

    //condition to check;
    if(isAlreadyRegistered){
        return res.status(409).json({
            message : "Username or email already exists...!!"
        })
    }
   

    //Hasing the password before saving it into the database'
    const hashedPassword =  crypto.createHash("sha256").update(password).digest("hex");

    //saving it to the database;
    const user = await User.create({
        username,
        email,
        password : hashedPassword
    })
    
    //creating the token
    const token = jwt.sign(
        {
        id : user._id
        },
       config.JWT_SECRET,
       {
        expiresIn : "1d"
       }
     )

     //sending the response
     res.status(201).json({
        message : "User created successfully",
        user : {
            username: user.username,
            email : user.email,
            token
        }
     })


}

//Get specific user using the jwt token:

export async function getMe(req,res) {
        
     const token  = req.headers.authorization?.split(' ')[1];

     if(!token){
        return  res.status(401).json({
            message : "Token not found"
        })
     }

     const decoded = jwt.verify(token, config.JWT_SECRET)
    
     const user = await User.findById(decoded.id)

     res.status(200).json({
        message : "User fetched successfully",
        user : {
            username : user.username,
            email : user.email
        }
     })
}
