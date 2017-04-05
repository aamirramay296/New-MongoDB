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




