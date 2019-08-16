var { MongoClient, ObjectID, url } = require('./mongoDb')
var db = require('./mysqlDb')
module.exports = {
    mongoDB : {MongoClient, ObjectID, url},
    mysql : { db }
}