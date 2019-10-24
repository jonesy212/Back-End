const router = require('express').Router()
const restrictUser = require('./restricted-middleware')
const User = require('../../api/private/users/user-model')
const secrets = require('../config/secrets');


const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const privateRoute = require('../private/server')

//localhost:5000/api/farm/login
router.post('/login',(req,res)=>{
    const u = req.body
    if(u.username && u.password){
        User.findByUserName(u.username)
        .then(user=>{
            bcrypt.compare(u.password,user.password,(err,success)=>{
                if(err) return res.status(401).json({message:"Invalid Credentials"})
                token = generateToken(user)
                delete user.password
                delete user.customer
                delete user.farmer
                res.status(200).json({user,token,token_type:'Basic'})
            })
        })
    }
})

//localhost:5000/api/farm/register
router.post('/register',(req,res)=>{
    const u = req.body
    if(u.username && u.password){
        User.add(u)
        .then(p=>{            
            res.status(201).json(u)
        })
        .catch(err=>{
            res.status(400).json({message:"Need Both Username And Password"},...err.stack )
        })
        console.log(req.body)
    }else{
        res.status(500).json({message:"Not able to make register a user."})
    }
})

function generateToken(user) {
    const payload = {
      username: user.username,
      subject: user.id,
      role: user.role
    };
    const options = {
      expiresIn: '15000',
    };
    return jwt.sign(payload, secrets.jwtSecret, options);
  }

  router.use('/private', restrictUser, privateRoute)

module.exports=router