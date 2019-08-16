var { MongoClient, ObjectID} = require('mongodb')
var url = 'mongodb+srv://haikal_m12:dendi1223@haikaldb-1wmxi.gcp.mongodb.net/test?retryWrites=true&w=majority'

module.exports = {
    MongoClient,
    ObjectID,
    url
}