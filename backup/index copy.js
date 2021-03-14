/**install packages
 * express
 * mongodb
 * http
 * dotnov
 * pug
 */

/*
work aournd the MongoError' of module exports inside circular dependency

https://stackoverflow.com/questions/66185671/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-c

Commenting out the following line inside node_modules/mongodb/lib/operations/operation.js:

const MongoError = require('../core').MongoError;

*/

// // web application form
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let http = require('http').Server(app);
require('dotenv').config();
const pug = require('pug');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//to respond to the GET, either to the root or the subfolder /create
app.get('/', function (req, res) {
  res.sendFile('/index.html', {root:'.'});
});

app.get('/create', function (req, res) {
  res.sendFile('/create.html', {root:'.'});
});

// //setting for running the request
app.set('port', process.env.PORT || 5000);
http.listen(app.get('port'), function() {
    console.log('listening on port', app.get('port'));
});

// setting for post
app.post('/create', function (req, res, next) {
  client.connect(err => {
    const customers = client.db("crmdb").collection("customers");

    let customer = { name: req.body.name, address: req.body.address, telephone: req.body.telephone, note: req.body.note };
    customers.insertOne(customer, function(err, res) {
      if (err) throw err;
      console.log("1 customer inserted");
    });
  })
  res.send('Customer created');
})

// enable updating deleting records
app.get('/get', function (req, res) {
  res.sendFile('/get.html', {root:'.'});
});

app.get('/get-client', function (req, res) {
    client.connect(err => {
        client.db("crmdb").collection("customers").findOne({name: req.query.name}, function(err, result) {
          if (err) throw err;
          res.render('update', {oldname: result.name, oldaddress: result.address, oldtelephone: result.telephone, oldnote: result.note, name: result.name, address: result.address, telephone: result.telephone, note: result.note});
        });
      });
});


//actions after get the records (run settings in .pug to create a template based form)
app.engine('pug', require('pug').__express)
app.set('views', '.')
app.set('view engine', 'pug')


// define actions update and delete (to post the request to mongoDB)
app.post('/update', function(req, res) {
  client.connect(err => {
    if (err) throw err;
    let query = { name: req.body.oldname, address: req.body.oldaddress, telephone: req.body.oldtelephone, note: req.body.oldnote };
    let newvalues = { $set: {name: req.body.name, address: req.body.address, telephone: req.body.telephone, note: req.body.note } };
    client.db("crmdb").collection("customers").updateOne(query, newvalues, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        res.render('update', {message: 'Customer updated!', oldname: req.body.name, oldaddress: req.body.address, oldtelephone: req.body.telephone, oldnote: req.body.note, name: req.body.name, address: req.body.address, telephone: req.body.telephone, note: req.body.note});
      });
  });
})

app.post('/delete', function(req, res) {
  client.connect(err => {
    if (err) throw err;
    let query = { name: req.body.name, address: req.body.address ? req.body.address : null, telephone: req.body.telephone ? req.body.telephone : null, note: req.body.note ? req.body.note : null };
    client.db("crmdb").collection("customers").deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send(`Customer ${req.body.name} deleted`);
    });
  });
})



// setting for connecting to mongoDB
const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

console.log(mongo_password, mongo_username)

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.sjftu.mongodb.net/crmdb?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

