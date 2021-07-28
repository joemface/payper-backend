var express = require('express');
const Book = require('../models/books');
var router = express.Router();
var client = require('../mongoConfig/booksConnection');

// let books = [
//   {title: "The Lord of the Rings", subtitle: "The Fellowship of the Ring", author:"J.R.R. Tolkien", price: 10.99, isbn: 9780007203581, copies: 2, img:"https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"},
//   {title: "The Lord of the Rings", subtitle: "The Two Towers", author: "J.R.R. Tolkien", price: 12.99, isbn: 9780007203598, copies: 3, img: "https://m.media-amazon.com/images/I/71u8+yoKy-L._AC_SX960_SY720_.jpg"},
//   {title: "The Lord of the Rings", subtitle: "The Return of the King", author: "J.R.R. Tolkien", price: 6.99, isbn: 9788845270758, copies: 5, img: "https://images-na.ssl-images-amazon.com/images/I/51MlPWDaXGL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"},
// ];

/* GET books listing. */
router.get('/', function(req, res, next) {
  client.connect(err =>{
    const collection = client.db("payper").collection("books");
    collection.find().toArray((err,books)=>{

      res.send(JSON.stringify(books));
      client.close();
    });

  });
});


router.post('/create-book', function(req, res, next) {
  let title = req.body.title;
  let subtitle = req.body.subtitle;
  let author = req.body.author;
  let price = req.body.price;
  let isbn = req.body.isbn;
  let copies = req.body.copies;
  let img = req.body.img;

  book = new Book(title, subtitle, author, price, isbn, copies, img);
  
  client.connect(err =>{
    const collection = client.db("payper").collection("books");
    collection
    .insertOne(book)
    .then(res=>{
      console.log("Successfully inserted book!");
     
    })
    .catch(err=>console.error(`Failed to insert item: ${err}`));
    res.status(201).send('Successfully created a book!');
  });
  
});

module.exports = router;