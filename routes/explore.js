const route = require('express').Router()
const User = require('../models/users')
const passport = require('passport')



route.get('/',(req,res)=>{
    return res.render('explore')
})


module.exports = {
    route
}