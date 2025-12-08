const express = require('express');
const app = express();

const dotenv = require('dotenv');

const dbconnection = require('./databaseconnection');


const port = 4000;

const usersrouter = require('./routes/users');
const booksrouter = require('./routes/books');
const db_connection = require('./databaseconnection');


dotenv.config();

dbconnection();

app.use(express.json());

app.use("/users", usersrouter);
app.use("/books",booksrouter);

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "home page"
    })
})

app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}`)
})