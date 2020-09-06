const mongoose = require('mongoose')

const TweetSchema = mongoose.Schema({
    id:{type:String,
          required:true,
          trim:true
            },
    username:{
        type:String,
        required:true
    },
    tweets:{
        type:String,
        required:true,
    },
    time:{
        type:Date, default:Date.now
    },
    name:{
        type:String,
        required:true
    }
})

// Created a schema and now we will make a model
const tweet_model = mongoose.model('tweet_model',TweetSchema);

module.exports = tweet_model