/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/login              ->  index
 */

'use strict';

// Gets a list of Users
var users = [
  {
    'name':'user',
    'password':'123',
    'token':'',
    'date':''
  }
];

export function index(req, res) {
  var user = users.find(function(res) { console.log(res.token); return res.token === req.headers.authorization});
  if (!!user){
    var expireDate = (Date.now() - user.date) < 30000;
  }
  if (!!user && user.token === req.headers.authorization && expireDate) {
    res.send(user);
  } else {
    res.statusCode = 401;
    res.send('not authorised')
  }
}

export function create(req, res) {
    var user = users.find(function(res) {return res.name === req.body.name});
    console.log(users.indexOf(user));
    if (user && user.password === req.body.password) {
        var newToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        user.token = newToken;
        user.date = Date.now();
        console.log(users);

        res.send(newToken)
    } else {
        res.statusCode = 401;
        res.send('sorry')
    }
}
