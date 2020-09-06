const express = require('express')
const app = express()
const server = require('http').createServer(app)
var bodyParser      = require('body-parser');


// Connecting with mongodb database
const mongoose = require('mongoose')
const DB_PATH = 'mongodb://localhost:27017/people'
mongoose.connect(DB_PATH)
const db = mongoose.connection
db.on('error',(err)=>{
    console.log(err)
})
const session = require('express-session')
app.use(session({
    secret:'nasknjakasbidsamfkropgrwnk',
    resave:false,
    saveUninitialized:true
}))
// Authentication of user using passport local
const passport = require('./passport')

  app.use(passport.initialize())
  //passport.initialize() specifies you will be authenticating using local strategy
  app.use(passport.session())
  // If using cookies
  

app.use(express.json())
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:true}))

app.set('view engine','hbs');

app.use(express.static(__dirname+'/views'))
app.get('/',(req,res)=>{
    res.render('login')
})

// Setting up routes

app.use('/signup',require('./routes/signup').route)
app.use('/login',require('./routes/login').route)
app.use('/profile',require('./routes/profile').route)
app.use('/user_tweet',require('./routes/user_tweet').route)
app.use('/explore',require('./routes/explore').route)



const PORT = process.env.PORT | 3000
    server.listen(PORT,()=>{
        console.log('server is running on port http://localhost:3000')
    })

