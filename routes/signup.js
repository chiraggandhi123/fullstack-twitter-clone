const route = require('express').Router()
const User = require('../models/users')
// const {user} = require('db')
// const {user} = require('../db')


route.get('/',(req,res)=>{
    return res.render('signup')
})

route.post('/',(req,res)=>{
    if(req.body.name && req.body.username && req.body.password)
    {
        var userData = {
            name:req.body.name,
            username:req.body.username,
            password:req.body.password
        }
        User.create(userData,(err,user)=>{
            if(err) return next(err)
            return res.redirect('/login')
        })

    }
    else{
        let err = new Error("You need to enter all information")
        err.status = 400
        return next(err)
    }

})
function next(err){
    console.log(err)
}


module.exports = {
    route
}