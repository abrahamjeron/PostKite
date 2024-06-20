const express = require('express')
const router = express.Router()
const User = require('./userAuthSchema')

router.use(express.json());

router.post('/authUser',(req,res)=>{
    User.create({
        userName:req.body.userName,
        password:req.body.password
    })
    .then(result => res.status(201).json(result))
    .catch(err=>console.log(err))
})
router.get('/getAuthUsers',(req,res)=>{
    User.find()
    .then(result=>res.status(201).json(result))
    .catch(err=>console.log(err))
})
router.get('/getuserbyUsername/:userName',(req,res)=>{
    User.find({userName:req.params.userName})
    .then(result=>res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error fetching user" });
    });
})
module.exports=router