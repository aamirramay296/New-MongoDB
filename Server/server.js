const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {user} = require('./models/user');

// 03209549796
// the server file is responsible for our routes ...
var app = express();

const port = process.env.PORT || 3000;
//if we r using cutom middleware it will be a function
app.use(bodyParser.json()); // middleware we need to give to express ...

// the return value from this is json mehtod is a function 
// and that is the middleware nd that is the middleware we need to give it to express ...

// to set up a post route ...
// url , callBack function

// we r focuing on the getting body data that got send from client
// for that we r going to use bodyParser module

/*body-parser will take the body of your request and parse 
it to whatever you want your server to receive in POST/PUT requests (JSON, URL encoded, text, raw) */

app.post('/todos', (req, res) => {

    var todo = new Todo({
            text: req.body.text
        }); 
        
     todo.save().then((doc) => {
         res.send(doc);

     }, (err) => {
         
         res.status(400).send(err);
    });
}); 


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // this goona let add other propert later onn ...
        res.send({todos});
        
    }, (err) => {

        res.status(400).send(err);
    });
});

// GET / todos/124242

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
    
       if(!todo) {
             return res.status(404).send();
        }

       res.send({todo}); // same res.send({todo: todo});

    }).catch((e) => {
        res.status(400).send();
    });
});

   /*... Deleting the Doc ... */
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        
        if(!todo) {
            return res.status(404).send();
        }

         res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });
});

// will use http patch method .. we use when we want to update .. 
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    // where update is going to store ...
    // using pick and takes and obj 
    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)) {

        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime(); // 

    }  else {
        body.completed = false;
        body.completedAt = null; // when u want to remove anything from database just set it = to null ...
    } 

    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {

        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    });
});

    /* ... Port 3000 ... */
app.listen(port, () => {
    console.log(`Started up a port ${port}`);
});

module.exports = {app};

// httpstatuses.com

/**we r using the post route, inside ur rest api there is basic crud operation */
/**when u want to create a resourse u use post http method nd u send that 
 * resourse as the body .. this means if want to make a new todo
 * we gonna send JSON object over to the server its gonna hav text property 
 * and server is gonna get that text property .. create the new model .. nd send 
 * the complete model back to the client ...... !!!
*/

 /** body-parser:
  * let us send JSON to the server, then server can then take the JSON
  nd do something with it, body-parser essentially parser the body, it take that string body 
  and turns it into javascript object ...
  */



