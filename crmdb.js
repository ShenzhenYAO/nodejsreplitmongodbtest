/* Read write data from the crmdb

 *install packages
 * mongodb
 * dotnov

work aournd the MongoError' of module exports inside circular dependency
https://stackoverflow.com/questions/66185671/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-c
Commenting out the following line inside node_modules/mongodb/lib/operations/operation.js:
const MongoError = require('../core').MongoError;
*/

// for reading useer name and password from dotenv
require('dotenv').config();

// setting for connecting to mongoDB
const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD

// define the cluster, type, db, and collection to access in mongoDB
const clusterName = 'cluster0', clusterType = 'sjftu', dbName = 'crmdb', collectionName = 'customers';
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@${clusterName}.${clusterType}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// add useUnifiedTopology: true to suppress some warning messages...
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/*****for the following, only uncomment one block at a time!************************************************************************ */

// // connect to mongoDB and add a record in the customers collection
// client.connect(err => {
//   const customers = client.db(dbName).collection(collectionName);
//   let customer = { name: 'name1', address: '100 somehwere', telephone: '+111', note: 'some notes' };
//   customers.insertOne(customer, function (err, res) {
//     if (err) throw err;
//     console.log("1 customer inserted");
//     client.close();
//   });
// })// client.connect()

// // connect to mongoDB and fetch the collection
// client.connect(err => {
//   const customers = client.db(dbName).collection(collectionName);
//   // to find all documents in a collection, use find({}). However unlike findOne(), find() returns a cursor object (who knows what the heck is a cursor obj1).
//   const cursor = customers.find({});
//   //to view the documents in this cursor, use the toArray method
//   cursor.toArray(function (err, res) {
//     if (err) throw err;
//     console.log(res);
//     // close it! otherwise it keeps openning and when running for the second time, there'll be two connections to MongoDB (max is 500 in 6 hours)
//     client.close();
//   });
// })// client.connect()

// // connect to mongoDB and update a record in the collection customers
// client.connect(err => {
//   if (err) throw err;
//   let query = { name: 'FN LN2' };
//   let newvalues = { $set: { address: '100 somewhere' } };
//   client.db(dbName).collection(collectionName).updateOne(query, newvalues, function (err, result) {
//     if (err) throw err;
//     console.log("1 document updated");
//     client.close();
//   });
// });

// connect to mongoDB and delete a record in the collection customers
// client.connect(err => {
//   if (err) throw err;
//   let query = { name: 'name1' };
//   client.db(dbName).collection(collectionName).deleteOne(query, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     client.close();
//   });
// });

/************************************************************************************ */

