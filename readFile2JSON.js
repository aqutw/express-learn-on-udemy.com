var express = require('express')
var app = express()
var fs = require('fs')
var debug = require('debug')('tag1')

app.get('/books/', function(req, res) {
  var filename = 'books.txt'
  fs.readFile(filename, function(e, data) {
    if (e) { debug(e); return res.sendStatus(500) }
    try {
      var books = JSON.parse(data)
      res.send(books)
    } catch (e) {
      res.sendStatus(500)
    }
    
  })

})

app.listen(22222, function(){
  console.log('starting on 22222')
})