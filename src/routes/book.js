var express = require("express");
const Book = require("../models/books");
var router = express.Router();
var client = require("../mongoConfig/booksConnection");

// let books = [
//   {title: "The Lord of the Rings", subtitle: "The Fellowship of the Ring", author:"J.R.R. Tolkien", price: 10.99, isbn: 9780007203581, copies: 2, img:"https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"},
//   {title: "The Lord of the Rings", subtitle: "The Two Towers", author: "J.R.R. Tolkien", price: 12.99, isbn: 9780007203598, copies: 3, img: "https://m.media-amazon.com/images/I/71u8+yoKy-L._AC_SX960_SY720_.jpg"},
//   {title: "The Lord of the Rings", subtitle: "The Return of the King", author: "J.R.R. Tolkien", price: 6.99, isbn: 9788845270758, copies: 5, img: "https://images-na.ssl-images-amazon.com/images/I/51MlPWDaXGL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"},
// ];

const collection = client.db("payper").collection("books");

/* GET books listing. */
router.get("/",  (req, res) => {
  client.connect(() => {
    collection.find({}).toArray(function (err, books) {
      //console.log(books);
      res.send(books);

      client.close();
    });
  });
});

router.put("/book/:isbn", function (req, res) {
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

router.get("/book/:isbn", function (req, res) {
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
