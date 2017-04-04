// mongoosejs.com // queries portion
const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {ObjectID} = require('mongodb');
const {user} = require('./../Server/models/user');

var id = '58e29e274811d2b41f4cc355';

// it doesnt require u to pass an object id , infact it will do it for u 
// we pass string as a value , mongoose is going to take that string 
// its will convert to object id , then its going to run the query ...

Todo.find({
    _id: id
}).then((Todos) => {

    if(!Todos) {
        return console.log('Id Not Found !!!');
    }
    console.log('Todos ',Todos);
});


// if u knw u r trying to fetch one individual item 
// use findOne ,it is recommended to use findOne over find
// u get the back doc as oppsed to array ...
// returns one document atmost ..
// graps the first one and matches the query u hav
if(!ObjectID.isValid(id)) {

    return console.log('ID NOT VALID');
}

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
}).catch((e) => {
    console.log(e);
});

Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('Id Not Found');
    }
    console.log('todo by id', todo);
});

// call back funcion
Todo.findOne({
    _id:id },
    (err, Todo) => {
        if(err) 
            return handleError(err);
        
        console.log(Todo);
});

// challenge .... 

// query users collections
// 58dab1b133405e50269df761

var id = '58dab1b133405e50269df761';

user.findById(id).then((user) => {

    if(!user) {
        return console.log('ID NOT FOUND');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));



