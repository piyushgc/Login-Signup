const express =require('express');
const router = express.Router();
const UserModel = require('./../models/user');

const {jwtAuthMiddleware,generateToken} = require('./../jwt');


//signu
router.post('/register',async(req,res)=>{
    
    try{
        const data = req.body;
        const email = req.body.email;

        // Check if a user with the same email already exists
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            console.log('Used email');
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        
        //new user doc. 
        const newUser = new UserModel(data);

        const response = await newUser.save();
        console.log('data saved');

        const payLoad= {
            id:response.id,
        }
        console.log(JSON.stringify(payLoad));

        const token = generateToken(payLoad);
        console.log("Token is : ",token);

        res.status(200).json({response: response,token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
 })

 //login
 router.post('/login',async(req,res)=>{
       try{
            const {email,password} = req.body;

            const user = await UserModel.findOne({email:email});
            if(!user||!(await user.comparePassword(password))){
                return res.status(401).json({error:'Invalid email or password'});
            }

            const payLoad= {
                id: user.id,
            }

            const token = generateToken(payLoad);
            res.status(200).json({message:'Success',token})
       }
       catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
       }

 })

 //password change
 router.post('/password',async(req,res)=>{
        try{
            const {email,oldPassword, newPassword} = req.body;

            const user = await UserModel.findOne({email:email});
            if(!user){
                return res.status(400).json({ error: 'User not found' });
            }

            const isMatch = await user.comparePassword(oldPassword);
            if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect old password' });
             }

             user.password = newPassword;
             await user.save();

             res.status(200).json({ message: 'Success' });
        }catch(err){

            console.log(err);
            res.status(500).json({error:'Internal Server Error'});
        }
 })
 module.exports=router;