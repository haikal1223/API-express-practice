var { db } = require('../database').mysql
module.exports = {
    getCategories: (req,res) => {
        var sql = `SELECT * FROM category`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            
            console.log(result);
            res.status(200).send(result)
        })
    },
    addCategories: (req,res) => {
        var data = req.body
    console.log(data);
    var sql = `INSERT INTO category set ?`
    db.query(sql,data,(err,result)=>{
        if (err) res.status(500).send(err)

        var sql = `SELECT * FROM category`
        db.query(sql,(err,result)=>{
        if (err) res.status(500).send(err)
        
        console.log(result);
        res.status(200).send(result)
     })
        
    })
    },editCategories: (req,res) => {
        var sql = `UPDATE category SET ? WHERE id = ${req.params.id}`
    db.query(sql,req.body,(err,result)=>{
        if (err) res.status(500).send(err)

        console.log(result)
        var sql = `SELECT * FROM category`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            
            console.log(result);
            res.status(200).send(result)
        })
    })
    },
    deleteCategories: (req,res) =>{
        var sql = `DELETE FROM category WHERE id = ${req.params.id}`
    db.query(sql,(err,result)=>{
        if (err) res.status(500).send(err)

        console.log(result);
        var sql = `SELECT * FROM category`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send(err)
            
            console.log(result);
            res.status(200).send(result)
        })
        
    })
    }
}