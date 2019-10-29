var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then((doc) => {
    return res.status(201).json(doc);
  })

  promise.catch((err) => {
    return res.status(501).json({message: 'error registering user.'})
  })
});

router.post('/login', (req, res, next) => {
  let promise = User.findOne({email: req.body.email}).exec();

  promise.then((doc) => {
    if(doc) {
      if(doc.isValid(req.body.password)) {
        let token = jwt.sign({username: doc.username}, 'secret', {expiresIn: '3h'});
        return res.status(200).send(token);
      } else {
        return res.status(501).json({message: 'Invalid Credentials.'});
      }
    } else {
      return res.status(404).json({message: 'User not found.'});
    }
  });

  promise.catch((err) => {
    return res.status(501).json({message: 'some internal error.'})
  })
});

router.get('/username', verifyToken, (req, res, next) => {
  return res.status(200).json(decodedToken.username);
});

var decodedToken = '';

function verifyToken(req, res, next) {
  console.log(req.query.token)
  let token = req.query.token;

  jwt.verify(token, 'secret', (err, tokendata) => {
    console.log('test')
    if(err) {
      return res.status(400).json({message: 'Unauthorized request.'});
    }
    if(tokendata) {
      decodedToken = tokendata;
      next();
    }
  });
}

module.exports = router;
