var mysql = require('mysql')

var db = mysql.createConnection({
    host: 'db4free.net',
    user: 'haikal',
    password:'dendi1223',
    database:'popokkece1223',
    port: 3306
})

module.exports = db