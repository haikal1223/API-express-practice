 var { MongoClient,ObjectID,url } = require('../database').mongoDB

module.exports = {
    getMovies: (req,res) =>{
        if(!req.query.title) {
            req.query.title = ''
        }
        if(!req.query.limit) {
            req.query.limit = 20
        }
        // if(!req.query.columns){
        //  var a = req.query.columns = {}
        //  var list = ['title','year']
        //  list.forEach((item)=>{
        //   var b = a[item] = 1
        //  })
        // }
        var obj = {}
        if(req.query.columns){
            req.query.columns.forEach((item)=>{
                obj[item] = 1
            })
        }
    
        MongoClient.connect(url,(err,client)=>{
            if (err) res.status(500).send(err)
    
            var moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.find({ title: { '$regex':req.query.title, '$options':'i' } }, obj).limit(parseInt(req.query.limit)).toArray((err1,docs)=>{
                client.close();
                if(err1) res.status(500).send(err1)
    
                res.status(200).send(docs)
            })
        })
    },
    addMovies: (req,res) => {
        MongoClient.connect(url,(err,client)=>{
            if(err) res.status(500).send(err)
            var moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.insertMany(req.body.data,(err,result)=>{
                client.close()
                if(err) res.status(500).send(err)
    
                res.status(200).send(result)
            })
        })
    },
    deleteMovie : (req,res) => {
        MongoClient.connect(url,(err,client)=>{
            var moviesCol = client.db('sample_mflix').collection('movies');
            moviesCol.deleteOne({_id: new ObjectID(req.params.id)},(err,result)=>{
                client.close();
                if (err) res.status(500).send(err)
    
                res.status(200).send(result)
            })
        })
    },
    editMovie : (req,res) =>{
         // jika unset ga ada baru masuk if
    // unset ga bisa pakai object kosong, pake object yang ga bakal ada
    if (!req.body.unset) {
        req.body.unset = {"lahahhahahahahahahahahhaah" : ""}
    }
    MongoClient.connect(url,(err,client)=>{
        var moviesCol = client.db('sample_mflix').collection('movies');
        moviesCol.updateOne({_id: new ObjectID(req.params.id)},{$set: req.body.set, $unset:req.body.unset },(err,result)=>{
            client.close();
            if (err) res.status(500).send(err)

            res.status(200).send(result)
        })
    })
    }
}