var mongoose = require('mongoose');
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// In ES6 (ECMASCRIPT-6)
module.exports = {mongoose};


//module.exports = {
 //   mongoose: mongoose
//}; 