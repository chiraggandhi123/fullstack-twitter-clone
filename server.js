const express = require('express')
const app = express()
const server = require('http').createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','hbs');

app.use(express.static(__dirname+'/views'))
app.get('/',(req,res)=>{
    res.render('index')
})






const PORT = process.env.PORT | 3000

server.listen(PORT,()=>{
    console.log('server is running on port http://localhost:3000')
})