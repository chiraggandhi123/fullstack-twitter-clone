const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const FacebookStrategy = require('passport-facebook').Strategy
const User = require('./models/users')

passport.serializeUser(function(user, done) {
    done(null, user.id)
})
   
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})


passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username:username}
    ).then((user)=>{
        // console.log(user)
        if(!user || password != user.password) return done(null,false)
        return done(null,user)
    }).catch(done)
}))

module.exports = passport