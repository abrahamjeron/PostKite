const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const User = require('./userSchema'); 


router.use(express.json());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});


router.get('/userdata', (req, res) => {
    User.find()
        .then(users => res.json(users)) 
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' }); 
        });
});

router.get('/user/:user', (req, res) => {
    const username = req.params.user; 

    User.findOne({ user: username }) 
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Error fetching user" });
        });
});

router.post('/uploadUser',upload.single('file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).send({ error: "No file provided" });
    }
    User.create({
        user:req.body.user,
        userName:req.body.userName,
        profile:req.file.filename,
        banner:req.file.filename,
        bio:req.body.profile,
        intrestedIn:req.body.intrestedIn,
        gender:req.body.gender,
        age:req.body.age,
        followers:req.body.followers,
        following:req.body.following
    })
    .then(result => res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error creating outfit" });
    });
})

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
