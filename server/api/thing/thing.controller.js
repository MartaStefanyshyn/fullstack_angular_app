/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/things              ->  index
 */

'use strict';

// Gets a list of Things
var users = [
  {   'name':'igor',
    'password':'123',
    'token':'',
    'date':''
  }
];

export function index(req, res) {
  // res.json(users);
  console.log(req.headers);
  var user = users.find(function(res) { console.log(res.token); return res.token === req.headers.auth});
  console.log(user);
  if (!!user && user.token === req.headers.auth && user.date == new Date().getDate()) {
    res.send(user);
  } else {
    res.statusCode = 401;
    res.send('not authorised')
  }
}

export function create(req, res) {
    var user = users.find(function(res) {return res.name === req.body.name});
    console.log(user);
    if (user && user.password === req.body.password) {
        var newToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        user.token = newToken;
        user.date = new Date().getDate();
        console.log(users);

        res.send(newToken)
    } else {
        console.log('sorry');
        res.statusCode = 401;
        res.send('sorry')
    }
}
