const mongoose = require('mongoose')
const postData = mongoose.Schema({
    post_Id:{
        type:String,
        require
    },
    comments:{
        type:String,
        require:false
    },
    commentedUser:{
        type:String,
        require:false
    },
    postedUser:{
        type:String,
        require:false
    },
    time:{
        type:String,
        require:false
    }
})
const postDetails = mongoose.model('postDetails',postData)
module.exports=postDetails;