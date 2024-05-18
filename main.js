const express = require('express')
const port = 3000
const app = express()
const bodyParser = require('body-parser')
const router1 = require('./router1.js')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.send("adu")
 })

app.use('/api',router1)
app.listen(port,()=>{
    console.log(`example app listening at http://localhost:${port}`)
 })