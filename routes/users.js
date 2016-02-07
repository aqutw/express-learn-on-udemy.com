var express = require('express');
var router = express.Router();
var debug = require('debug')('debug1')

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query && req.query.created) {
    res.send('created '+req.query.created+'!!');
  }
  res.send('respond with a resource');
});

router.get('/try_params/:id', function(req, res, next) {
  var id = req.params.id
  var str = require('crypto').createHash('sha1')
            .update(new Date().toDateString() + id)
            .digest('hex')
  res.send(str)
})

router.get('/try_jade', function(req, res, next) {
  res.render('try_jade', {a:1, b:2})
})

router.get('/:id', function(req, res, next) {
  // console.log(req.params); //{ id: 'asdfa' }
  console.log('req.route',req.route, req.route.path /* ':id' */ )
  console.log('req.cookies', req.cookies)
  console.log('req.signedCookie', req.signedCookie)
  console.log('req.body', req.body)
  var anyHeaderKey = 'User-Agent'
  console.log(req.get(anyHeaderKey))
  console.log(req.acceptsCharsets('big5'))
  console.log(req.ip)
  // console.log(req.ips) //with trust-proxy on
  var isAJAX = req.xhr
  console.log(req.path // /asdlaf
    , req.host, req.fresh, req.stale, isAJAX, req.protocol, req.secure, req.subdomains, 
    req.originalUrl //  /users/asdlaf
    )
  var str = '<h1>'+req.params.id+'</h1><form method=post action="/users/"><input type="text" name=username value=test_username /><input type="text" name="email" value="test_email@aaa.com" />'+
    '<input type=checkbox name=chk value=chk1 />'+
    '<input type=checkbox name=chk value=chk2 />'+
    '<input type=submit value="Submit" /></form>'
  res.send(str)
})
router.post('/', function(req, res, next) {
  var username = req.body.username
  var email = req.body.email
  
  //res.send(username+','+email) //show created user data
  //res.redirect('/users/?created='+username); //redirect
  //res.json(200, {code:0})
  // res.sendfile(path, options, callback)
  // res.render(tmplName, locals, callback)
  // res.locals // pass data to template

  /*
  res.status( !exists ? 404 : (authorized ? 200 : 401) )
  */
  debug(req.body)
  res.set('Content-Type', 'text/plain')
  res.send('<h1>pure content without html effect</h1>')

  //res.status(404).end() //sending a empty response
})


module.exports = router;
