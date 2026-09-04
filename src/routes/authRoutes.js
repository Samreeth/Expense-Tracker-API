import {Router} from 'express'
import * as authController from '../controllers/authController.js'


const authRouter  =  Router()


// POST/api/register 
authRouter.post('/register',authController.register)

//GET/api/get-me
authRouter.get('/get-me',authController.getMe)


export default authRouter
