const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const {ObjectID} = require('mongodb');
/*testing lifecycle method ...
make sure db is empty */

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    //pass in an empty object ...

    Todo.remove({}).then(() => {

        return Todo.insertMany(todos)
    }).then(() => done()); // Todo.remove({}).then(() => done()); <-- expression syntx

}); 

    /**-------------------- */
    /* POST / todos */
    /**------------------- */

describe('POST /todos ', () => {
    it('should create a new todo', (done) => { // this is a async test 
        var text  = 'Text todo text';

        request(app)
            .post('/todos')
            .send({text}) // we send obj , this obj is gonna converted to JSON by supertest by default ...
            .expect(200) // assertion 
            
            .expect((res) => { // body that comes has text property = that one we specify, and iz obj ... 

                expect(res.body.text).toBe(text);
            })
            .end((err, res) => { // what actually got store in mongoDB ..

                if(err) { // callBack function

                    return done(err); // this iz gonna rap up the done 
                }

                Todo.find({text}).then((todos) => {// find() fetch everything todos....
                    
                    //assertions
                    expect(todos.length).toBe(1); //bcoz of only one property text = 1
                    expect(todos[0].text).toBe(text); // ?
                    done();

                }).catch((e) => {  // .catch((e) => done(e));
                    done(e);
                });
            });
    });


    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({}) // we r sending empty obj ...
            .expect(400)
            .end((err, res) => {
                
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {

                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });

   describe('GET / todos ', () => {

        it('testing the get ', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2);
                })
                .end(done);
        });
   });

    /**-------------------- */
    /* GET / todos/: id */
    /**------------------- */
 describe('GET/ todos/:id', () => {
       
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) // obj id so need to convert into string 
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
      });

      it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
      });

      it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);

      });
   });

   /**-------------------- */
    /* DELETE / todos/: id */
    /**------------------- */
   describe('DELETE/todos/:id', () => {

    it('should return remove a todo doc', (done) => {

        request(app)
            .delete(`/todos/${todos[1]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {

                expect(res.body.todo._id).toBe(`${todos[1]._id.toHexString()}`);
            })
            .end((err ,res) => {
                if(err) {
                    return done(err);
                }
                
                Todo.findById(`${todos[1]._id.toHexString()}`).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should return 404 of todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done)=> {
        request(app)
            .delete('/todos/123abc')
            .expect(404)
            .end(done);
    });
  });
});
