const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{type:String,
          required:true,
          trim:true
            },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    tweets:[{
        type:String,
    }],
    userids:[{
        type:String,
    
    }]
})

// Created a schema and now we will make a model
const User = mongoose.model('user',UserSchema);

module.exports = User