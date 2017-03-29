var mongoose = require('mongoose');

var user = mongoose.model('User', {
    name : {
     type: String,
     trim: true,
     required: true, 
     minlength: 1,
    }
    
});


module.exports = {user};