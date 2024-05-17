
const express = require('express')
var router = express.Router()
const fs = require('fs')
const data =  JSON.parse( fs.readFileSync("data.json")) 
router.get('/',(req,res)=>{
    res.send(data)
})
router.get('/:id',(req,res)=>{
    var id = req.params.id
    data.forEach(element => {
        if(element.id == id)
            {
                res.send(element)
            }
    });
   
})
function validfomat(req,res,next)
{
    let keys=Object.keys(data[0])
    let newob = req.body
    let newobkeys = Object.keys(newob)
    newobkeys.forEach((e)=>{
        if(!keys.includes(e))
        {
            res.send("data sai cut")
        }
    })
    next()
}

router.post("/",validfomat,(req,res)=>{
    res.send(req.body)
    req.body.id = data[data.length-1].id+1
    data.push(req.body)
    fs.writeFileSync('data.json',JSON.stringify(data))
})
router.put('/:id',(req,res)=>{
    var newob = req.body
    var id = req.params.id
    req.body.id = id
    data.forEach((e,x)=>{
        if(e.id == id)
            {
                data[x] = req.body
            }
    })
    fs.writeFileSync('data.json',JSON.stringify(data))
    res.send('success')
})
router.delete('/:id',(req,res)=>{
    var id = req.params.id
    data.forEach((e,x)=>{
        if(e.id==id)
            {
                data.splice(x,1)
            }
    })
    fs.writeFileSync('data.json',JSON.stringify(data))
    res.send("success")
})
module.exports = router;