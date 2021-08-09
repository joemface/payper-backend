const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.yk4je.mongodb.net/payper?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;