var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

// the server file is responsible for our routes ...
var app = express();

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

app.listen(3000, () => {

    console.log('Starting Port 3000');
});

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



