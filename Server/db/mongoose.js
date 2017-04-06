var mongoose = require('mongoose');
 
mongoose.Promise = global.Promise;
// THE STRING IS USED FOR BOTH TESTING AND DEVELOPMENT
// By testing when we run our test script "test": "mocha Server/**/*.test.js",
// BY DEVELOPMENT WHEN WE RUN OUR APP LOCAlly "start": "node Server/server.js"

mongoose.connect(process.env.MONGODB_URI);
//MONGODB_URI environemt variable

// In ES6 (ECMASCRIPT-6)
module.exports = {mongoose};


//module.exports = { 
 //   mongoose: mongoose
//}; 

// we aleady hav the produnction environemt, this is what we call app on heroku 
process.env.NODE_ENV === 'production'

//when we run our app locally 
process.env.NODE_ENV === 'development'

//when we run our app through mocha
process.env.NODE_ENV ==='test'

// this meaning we will set diff value for MONGODB_URI