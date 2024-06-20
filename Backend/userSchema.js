const mongoose = require('mongoose');
const UserData = new mongoose.Schema({
    user:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        require:false
    },
    banner:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        require:false
    },
    intrestedIn:{
        type:String,
        require:false
    },
    gender:{
        type:String,
        require:false
    },
    age:{
        type:Number,
        require:false
    },
    followers:{
        type:Number,
        require:false
    },
    following:{
        type:Number,
        require:false
    }
});
const userDataSet = mongoose.model('userDatas',UserData);
module.exports = userDataSet;