// constructor function ..
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err) {
       return console.log('Unable to connect to the mongodb');
    }

    console.log('Connected to Mongodb Server');

 // By default we can have .find() that will fetch everything ... we want every document from Todos
 // find() returns mongodb cursor ...it actually points to those document ...   
 // cursor method called toArray
 // instead of cursor we have array of document ..it means we have array of obj they hav text propeties , complete properties
 // we want back the document
 // toArray return promise

//     db.collection('Todos')
//     //.find({ text: 'Walk the dog', completed: true }) // inside find we hav the query ..
//     .find({_id: new ObjectID('58d8f83cc4fbdec242a4cd3e')})
//     .toArray()
//     .then((docs) => {

//         console.log('Todos');
//         console.log(JSON.stringify(docs, undefined,2)); // undefind is filter function ...

//     }, (err) => {
//         console.log('Unable to fetch todos ',err);
//     });

//    db.close();

/*This is count of documents*/

    // db.collection('Todos')
    // .find()
    // .count()
    // .then((count) => {

    //     console.log(`Todos count : ${count}`);
      
    // }, (err) => {

    //     console.log('Unable to fetch Todos ' ,err);
    // });

    //  db.close();

/**Challenge ..... */

    // db.collection('User')
    // .find({name: 'Hassan'})
    // .toArray()
    // .then((docs) => {

    //     console.log(JSON.stringify(docs, undefined,2));
    // }, (err) => {

    //     console.log('Unable to fetch data');
    // });
    // db.close();

    /**Using foreach */

});
