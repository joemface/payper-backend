class Book{
    constructor(title, subtitle, author, price, isbn, copies,img){
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.price = price;
        this.isbn = isbn;
        this.copies = copies;
        this.img = img;
    }
}

module.exports = Book;