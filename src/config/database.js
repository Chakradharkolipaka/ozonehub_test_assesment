const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

mongoose.set('strictQuery', true);

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        });
}

module.exports = connectDatabase;