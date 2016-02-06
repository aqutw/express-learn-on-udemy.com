var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query && req.query.created) {
    res.send('created '+req.query.created+'!!');
  }
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
  var str = '<h1>'+req.params.id+'</h1><form method=post action="/users/"><input type="text" name=username value=test_username /><input type="text" name="email" value="test_email@aaa.com" /><input type=submit value="Submit" /></form>'
  res.send(str)
})
router.post('/', function(req, res, next) {
  var username = req.body.username
  var email = req.body.email
  
  //res.send(username+','+email) //show created user data
  res.redirect('/users/?created='+username); //redirect
})

module.exports = router;
