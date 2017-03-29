const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if(err) {
        return console.log('Unable to connect to Mongo Server');
    }

    console.log('Connected to Mongo Server Successfully');
    //-->  deleteMany

    // db.collection('Todos')
    // .deleteMany({text:'Eat Lunch'})
    // .then((result) => {

    //     console.log(result);
    // }, (err) => {

    //     console.log(err);
    // }); 


    //-->  deletOne

    // db.collection('Todos')
    // .deleteOne({text:'Something to do'})
    // .then((result) => {

    //     console.log(result);
    // }, (err) => {

    //     console.log(err);
    // });

    //===> findOneAndDelete

    // db.collection('Todos')
    // .findOneAndDelete({completed:false})
    // .then((result) => {
    //    console.log(result); 
    // }, (err) => {
    //     console.log(err);
    // });

    //---> Challenge

    db.collection('User')
    .findOneAndDelete({_id: new ObjectID('58d9509ee9e4e2f5411f4a38')})
    .then((result) => {

        console.log(JSON.stringify(result, undefined, 2));

    }, (err) => {

        console.log(`Unable to Delete ${err}`);
    });

    // db.collection('User')
    // .deleteMany({name:'Hassan'})
    // .then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log(err);
    // });



    
    //db.connect();
});

//ORM (object relational mapping ...)