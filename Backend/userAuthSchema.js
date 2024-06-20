const mongoose = require('mongoose')
const UserAuth = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const userAuthDataSet = mongoose.model('userAuthdatas',UserAuth)
module.exports = userAuthDataSet;