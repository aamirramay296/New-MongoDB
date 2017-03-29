// const MongoClient = require('mongodb').MongoClient; // MongoClient let u connect to the mongo server ...

const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID(); // new instance of ObjectID ... 
console.log(obj); // generates regular object id ... 

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { 
// TodoApp is a new db created ...

// object destructuring let u pull out propertiees from an object creating variables ...
    // Object destructuring in ES6
    var user = { name:'Aamir', age:24 };
    var {name} = user;
    console.log(name);

    if(err) {
        return console.log('Unable to connect to the Mongodb Server');
    }
    console.log('Connected to Mongodb Server');
});
    // db.collection('Todos').insertOne({

    //     text:'Something to do',
    //     completed:false

    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to Insert Todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2)); 
    //     // ops attribute is going to store all docs we inserted like insertOne .. 
    // }); // insertOne let u insert new document 
  

  /**This is the assessment course ... */
//     db.collection('User').insertOne({
//         //_id: 121, // can also give a default id by ur self
//         name: 'Hassan',
//         age: 24,
//         location: 'Pakistan'
//       }, (err, result) => {
//           if(err) {
//               return console.log('Unable to Insert User ', err);
//           }
//         //  console.log(JSON.stringify(result.ops,undefined,2));
//         console.log(result.ops[0]._id.getTimestamp()); // wil return the time that the object id was created at ...
//       });

//     // db.close();
// }); 
// the callBack func will aftr successfull connection to db (local URL) .. 
//Mongo dont create database until we add some data to it ...

// Mongo was designed to scale out v really easily .. 
// means u add more database server to handle that extra load ...

// when we use randomly generated id .. we dont need to
// constantly communicate with the database server to check what the highest 
// incrmentaly value is ... we r going to generate new randow id to the document unique identifeir


// the object is made up of 12 bytes value ... 
// the first 4 byte are time stamp
// the next 3 bytes are machine identifeir .. that means if 2 computers genearte 
// a id its going to be different .. ensures the id is differnet

// 2 byte the process id
// 3 byte counter 