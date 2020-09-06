const route = require('express').Router()
const User = require('../models/users')
const tweet_model = require('../models/tweet_data')
route.get('/',(req,res)=>{
    // console.log(req.user)
    
    
    // console.log(userList)
    res.render('home',{
        user:req.user
        
    })
})
route.post('/',(req,res)=>{
 
    res.end()
})
//GET USER SPECIFIC DATA
route.get('/getUserSpecificData',(req,res)=>{
    var id = req.user._id
    User.findById(id,(err,users)=>{
        if(err) throw err
        res.send(users)
        // console.log("userList",userList)
    })
})
// GET USER DATA
route.get('/getUserData',(req,res)=>{
    var id = req.user._id
    User.find((err,users)=>{
        var data = {id, users}
        res.send(data)
        // console.log("userList",userList)
    })
})
// GET USER SPECIFIC TWEET DATA
route.get('/getUserSpecificTweets',(req,res)=>{
    console.log(req.query.q)
    tweet_model.find({username:req.query.q},(err,users)=>{
        if(err) throw err 
        
        res.send(users)
    })
})
// GET TWEET DATA
route.get('/getAllTweets',(req,res)=>{
    tweet_model.find((err,users)=>{
        if(err) throw err 
        
        res.send(users)
    })
})
// ADD USER
route.post('/addUser',(req,res)=>{
    User.updateOne(
        { _id: req.user._id }, 
        { $push: { userids: req.body.username } },
        done
    );
    res.redirect('/profile')
})
// DEL USER
route.post('/delUser',(req,res)=>{
    User.updateOne( {_id: req.user._id}, { $pullAll: {userids: [req.body.username] } } ,done)
    res.redirect('/profile')
})
function getUserMap(users,id,list){
users.forEach(element => {
    // console.log(typeof(element._id),typeof(id))
    // console.log(JSON.stringify(element._id))
    if(element._id!==id)
    {
        list.push(element)
    }
    // return list
});

}
function done(){
    console.log("userids updated succesfully")
    
    res.redirect('/profile')
}
module.exports = {route}