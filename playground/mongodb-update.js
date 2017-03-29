//mongodb.github.io collection in method findOneAndUpdate ...
//http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#findOneAndUpdate
// mongoDb update operator 

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err,db) {
    if(err) {
        return console.log('Unable To Connect To MongoDB Server');
    }
    console.log('Connected To MongoDB Server');

    // db.collection('Todos')
    // .findOneAndUpdate({
    //     _id: new ObjectID('58d95b3e947bbc8be13970ca')
    // }, {
    //     $set: {
    //         completed:false
    //     }
    // }, {
    //     returnOriginal:false 
    // }).then((result) => {

    //     console.log(result);
    // });

/**Assessment  */
    db.collection('User')
    .findOneAndUpdate({
        _id: new ObjectID('58d964a9947bbc8be13971cd')},

         { $set: { name:'Aamir Naeem Ramay' } },

         { $inc: { age: 1 } },

         { returnOriginal:false })

         .then((result) => {

        console.log(result);
    });

    // db.collection('User')
    // .update({
    //     _id: new ObjectID('58d964a9947bbc8be13971cd')},
        
    //     { $inc: { age: 1 } },
    //     { returnOriginal: false });
   //db.close();
});

//9728