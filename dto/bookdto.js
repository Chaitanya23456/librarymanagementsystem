

class issuedbook{
    _id;
    name;
    author;
    genre;
    year;
    issuedDate;
    returnDate;

    constructor(user) {
        this._id = user.issuedbook._id;
        this.name = user.issuedbook.name;
        this.author = user.issuedbook.author;
        this.genre = user.issuedboook.genre;
        this.year = user.year;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}
