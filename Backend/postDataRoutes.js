const express = require('express')
const router = express.Router()
const PostData = require('./postDataSchema')

router.use(express.json());

router.get('/comment',(req,res)=>{
    PostData.find()
    .then(postData=>{
        res.json(postData)
        console.log(PostData)
    })
})
router.get('/getcomment/:post_Id', (req, res) => {
    PostData.find({post_Id:req.params.post_Id})
    .then(result=>res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error fetching post" });
    });
});
router.post('/postComment',(req,res)=>{
    PostData.create({
        post_Id:req.body.post_Id,
        comments:req.body.comments,
        commentedUser:req.body.commentedUser,
        postedUser:req.body.postedUser,
        time:req.body.time
    })
    .then(result => res.status(201).json(result))
    .catch(err => {
        console.error(err);
        res.status(500).send({ error: "Error creating " });
    });
})
module.exports=router;