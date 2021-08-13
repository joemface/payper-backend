var express = require("express");
const Book = require("../models/books");
var router = express.Router();
var client = require("../mongoConfig/booksConnection");

router.get('/favicon.ico', function(req, res, next){ res.status(204)});

router.get("/",  function(req, res,next) {
  client.connect(err => {
    const collection = client.db("payper").collection("books");
    collection.find({}).toArray(function (err, books) {
      res.status(200).send(books);
      client.close();
    });
  });
});

router.put("/book/:isbn", function (req, res, next) {
  let ISBN = req.params.isbn;
  let title = req.body.title;
  let subtitle = req.body.subtitle;
  let author = req.body.author;
  let price = req.body.price;
  let isbn = req.body.isbn;
  let copies = req.body.copies;
  let img = req.body.img;
  let cart = false;
  let quantity = 0;

  let filter = { isbn: ISBN };
  let update = {
    $set: {
      title: title,
      subtitle: subtitle,
      author: author,
      price: price,
      isbn: isbn,
      copies: copies,
      img: img,
      cart: cart,
      quantity: quantity,
    },
  };

  client.connect((err) => {
    const collection = client.db("payper").collection("books");
    collection
      .findOneAndUpdate(filter, update, { upsert: false })
      .then((result) => {
        res.status(204).send("Successfully updated the book!");
        client.close();
      });
  });
});

router.get("/book/:isbn", function (req, res, next) {
  client.connect((err) => {
    const collection = client.db("payper").collection("books");
    collection.findOne({ isbn: req.params.isbn }, (err, result) => {
      //console.log("The book is: " + JSON.stringify(result));
      res.status(202).send(result);
      client.close();
    });
  });
});

router.post("/book", function (req, res, next) {
  let title = req.body.title;
  let subtitle = req.body.subtitle;
  let author = req.body.author;
  let price = req.body.price;
  let isbn = req.body.isbn;
  let copies = req.body.copies;
  let img = req.body.img;
  let cart = false;
  let quantity = 0;

  book = new Book(
    title,
    subtitle,
    author,
    price,
    isbn,
    copies,
    img,
    cart,
    quantity
  );

  client.connect((err) => {
    const collection = client.db("payper").collection("books");
    collection
      .insertOne(book)
      .then((res) => {
        res.status(201).send("Successfully inserted book!");
        client.close();
      })
      .catch((err) => console.error(`Failed to insert item: ${err}`));
  });
});

module.exports = router;
