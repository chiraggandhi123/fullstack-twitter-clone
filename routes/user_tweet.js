const route = require('express').Router()
const User = require('../models/users')
const tweet_model = require('../models/tweet_data')

route.post('/',(req,res)=>{
    // console.log(req.body)
    // console.log(req.user._id)
    User.updateOne(
        { _id: req.user._id }, 
        { $push: { tweets: req.body.tweet } },
        done
    );
    // Insertiung tweet Data
    tweet_model.create({
        id:req.user._id,
        username:req.user.username,
        tweets:req.body.tweet,
        name:req.user.name
    },(err,tweets)=>{
        if(err) throw err
    })
    res.redirect('/profile')
})
function done(){
    console.log("Added tweet")
    // res.redirect('/profile')
}
// }
module.exports = {route}