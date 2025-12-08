const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookschema = new schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    }
},{timestamps : true})


module.exports = mongoose.model("Book",bookschema)