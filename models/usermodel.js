const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userschema = new schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    issuedBooks : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book",
        required : false
    },
    issueddate : {
        type : String,
        required : false
    },
    returndate : {
        type : String,
        required : false
    },
    subscriptionType : {
        type : String,
        required : true
    },
    subscriptionDate : {
        type : String,
        required : true
    }
},{timestamps : true})


module.exports = mongoose.model("User",userschema)