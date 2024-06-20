const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require('multer')
const Post = require('./postSchema');
const { route } = require('./userRoutes');

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

router.get('/allpost',(req,res)=>{
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})
router.get('/userKite/:userName',(req,res)=>{
    Post.find({userName:req.params.userName})
    .then(result=>res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error fetching post" });
    });
})
router.post('/uploadpost',upload.single('file'),(req,res)=>{
    if (!req.file) {
        return res.status(400).send({ error: "No file provided" });
    }
    Post.create({
        userName:req.body.userName,
        postImage:req.file.filename,
        likes:req.file.likes,
        caption:req.body.caption,
        tags:req.body.tags,
        location:req.body.location,
        postingTime:req.body.postingTime
    })
    .then(result => res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error creating " });
    });
})
module.exports = router