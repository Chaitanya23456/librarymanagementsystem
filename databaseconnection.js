const mongoose = require('mongoose');

function dbconnection() {
    const db_url = process.env.MONGO_URL; // <-- Make sure name matches your .env

    mongoose.connect(db_url)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.error("Connection error", err);
        });
}

module.exports = dbconnection;
