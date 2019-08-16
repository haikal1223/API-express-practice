var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')

var { MongoClient, ObjectID} = require('mongodb')
var url = 'mongodb+srv://haikal_m12:dendi1223@haikaldb-1wmxi.gcp.mongodb.net/test?retryWrites=true&w=majority'

var port = 1999



var arr = [{
    id : 1,
    nama: 'Popok Dewasa',
    harga: 100000,
    description: 'You are old man LOL'
},{
    id:2,
    nama : 'Popok Bayi',
    harga: 200000,
    description:'Get ready for scream every night'
},{
    id:3,
    nama : 'Popok OK',
    harga: 200000,
    description:'FOR YOU'
}]

var app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('<h1>Hello World</h1>')
})

const {
    mongoRouter,
    mysqlRouter
} = require('./routers')

app.use('/mongo',mongoRouter)
app.use('/mysql',mysqlRouter)

app.get('/users',(req,res)=>{
    if(!req.query.username){
        req.query.username = ''
    }
    if(!req.query.password){
        req.query.password =''
    }
    // if(!req.query.usiaMIN){
    //     req.query.usiaMIN = 0
    // }
    // if(!req.query.usiaMAX){
    //     req.query.usiaMAX = 999
    // }
    var sql = `SELECT u.*,r.nama as roleName
    FROM users u
    LEFT JOIN roles r
    ON u.roleid = r.id
    WHERE username LIKE '%${req.query.username}%'
    AND password LIKE '%${req.query.password}%'`;
    if(req.query.usiaMin){
        sql+= ` AND usia >= ${req.query.usiaMin}`
    }
    if(req.query.usiaMax){
        sql+= ` AND usia <= ${req.query.usiaMax}`
    }
    if(req.query.email){
        sql+= ` AND email LIKE '%${req.query.email}%'`
    }
    if(req.query.role){
        sql+= ` AND r.nama = '${req.query.role}'`
    }
  
    db.query(sql,(err,result)=>{
        if (err) res.status(500).send(err)
        
        console.log(result);
        res.status(200).send(result)
    })
})

app.get('/home',(req,res)=>{
    res.send({message : 'Ini Home'})
})

app.get('/products/:id',(req,res)=>{
    console.log('Masuk products/id');
    // console.log(req.params.id);
    // console.log(typeof(req.params.id));
    var newArr = arr.filter((item)=> item.id == req.params.id) 
    console.log(newArr);
    res.send(newArr)
})

app.get('/products',(req,res)=>{
    console.log('Masuk /products');
    console.log(typeof(req.query.nama));
        var newArr = arr
    if(req.query.nama){
        newArr = newArr.filter((item)=> item.nama.toLowerCase().includes(req.query.nama.toLowerCase()))
        res.send(newArr)
   }
   if(req.query.hargaMin){
        newArr = newArr.filter((item)=> item.harga >= parseInt(req.query.hargaMin))
   }
   if(req.query.hargaMax){
       newArr = newArr.filter((item)=> item.harga <= parseInt(req.query.hargaMax))
   }
       res.send(newArr)
})

app.get('/test',(req,res) =>{
    try{
        console.log('Masuk /test');
        res.status(202).send('Request ke Test berhasil')
    }catch{
        console.log(err.message);
        res.status(500).send(err.message)
    }
   
})

app.post('/addproduct', (req,res)=>{
    console.log(req.body);
    arr.push(req.body)
    res.status(201).send({message :'Add Product Succes!',newData : arr })
})

app.get('/category',(req,res)=>{
  
})

app.post('/category',(req,res)=>{
    
})

app.delete('/category/:id',(req,res)=>{
    
})

app.put('/category/:id',(req,res)=>{
    
})

// ===========================MONGODB========================
app.get('/movies',(req,res)=>{
    
})
app.post('/movies',(req,res)=>{

   
})
app.delete('/movies/:id',(req,res)=>{
  
})
app.put('/movies/:id',(req,res)=> {
   
})
app.listen(port,()=>{
    console.log(`API aktif di port ${port}`  )
    
})