const {ObjectID} = require('mongodb');

const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {user} = require('./../Server/models/user');

// Todo.remove({}) pass in query and query multiple matches .. works like find()
// u can't pass an ampty object like Todo.remove()
// if u want to remove everything from u collection Todo.remove({})
// in remove method we donot get the doc back 

Todo.remove({}).then((result) => {
    console.log(result);
});

// both of the these return the doc 
//Todo.findOneAndRemove
//Todo.findByIdAndRemove

//58e49fbd0094e806f751e1e6
Todo.findByIdAndRemove('58e49fbd0094e806f751e1e6').then((todo) => {
    console.log(todo);
});

// works same as findByIdAndRemove , but takes the query object ..
Todo.findOneAndRemove({_id: '58e4a0760094e806f751e1fd'}).then((todo) => {
    console.log(todo);
});