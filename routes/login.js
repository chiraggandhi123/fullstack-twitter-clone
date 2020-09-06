const route = require('express').Router()
const User = require('../models/users')
const passport = require('passport')



route.get('/',(req,res)=>{
    return res.render('login')
})

route.post('/',passport.authenticate('local',{
    successRedirect:'/profile',
   failureRedirect:'/login'
}))


module.exports = {
    route
}