const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = "mongodb+srv://"+process.env.DB_STRING+"@paypercluster.s6ige.mongodb.net/payper?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = client;