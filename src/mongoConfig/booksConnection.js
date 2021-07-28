const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
dotenv.config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yk4je.mongodb.net/payper?retryWrites=true&w=majority`;


module.exports = client;