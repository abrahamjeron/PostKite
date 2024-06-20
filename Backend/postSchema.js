const mongoose = require('mongoose')
const PostData = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    postImage:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        require:true
    },
    caption:{
        type:String,
        require:true
    },
    tags:{
        type:String,
        require:false
    },
    location:{
        type:String,
        require:false
    },
    postingTime:{
        type:String,
        require:false
    }
})
const postData = mongoose.model('postData',PostData);
module.exports=postData