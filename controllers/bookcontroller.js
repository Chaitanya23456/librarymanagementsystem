const {bookmodel,usermodel} = require("../models")
const issuedBooks = require("../dto/bookdto");

exports.getallbooks = async(req,res) => {
    const books = await bookmodel.find()

    if(books.length === 0){
        return res.status.json({
            success : false,
            message : "No books i  the system"
        })
    }


    res.status(200).json({
        success : true,
        data : books
    })
}

exports.getsinglebookbyid = async(req,res) => {

    const {id} = req.params;

    const book =  await bookmodel.findById(id)

    if(!book){
       return res.status(404).json ({
            success : false ,
            message : `Book not found for id : ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : book
    })
}


exports.getallissuedbooks = async(req,res) => {

    const usersWithIssuedBooks = await usermodel.find({ issuedBooks: { $exists : true } }).populate('issuedBooks');

    const issuedBooks = usersWithIssuedBooks.map(user => new issuedBooks(user));

    if(issuedBooks.length === 0){
        return res.status(404).json({
            success : false,
            message : "No issued books found in the system"
        })
    }

    res.status(200).json({
        success : true,
        data : issuedBooks
    })
}


exports.addnewbook = async(req,res) => {
    
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "Please provide book data to add"
        })
    }

    await bookmodel.create(data);

    // res.status(201).json({
    //     success : true,
    //     message : "Book added successfully",
    //     data : data
    // })


    const allbooks = await bookmodel.find();

    res.status(201).json({
        success : true,
        message : "Book added successfully",
        data : allbooks
    })
}


exports.updatebookbyid = async(req,res) => {

    const {id} = req.params;

    const {data} = req.body;

    if(!data || Object.keys(data).length === 0) {
     return res.status(400).json({
         success : false,
         message : "Please provide data to update"
     })
    }

    // const book = await bookmodel.findById(id);

    // if(!book){
    //    return res.status(404).json ({
    //         success : false ,
    //         message : ` Book not found for id :${id}`
    //     })
    // }   

    // Object.assign(book,data);
    // await book.save();

    // res.status(200).json({
    //     success : true,
    //     data : book,
    //     message : "Book updated succesfully"    
    // })


    const updatedbook = await bookmodel.findByOneAndUpdate(
        {_id : id},
        data,
        {new : true}
    );

    if(!updatedbook){
       return res.status(404).json ({
            success : false ,
            message : ` Book not found for id :${id}`
        })
    }


    res.status(200).json({
        success : true,
        data : updatedbook,
        message : "Book updated succesfully"    
    })

}    


exports.deletebookbyid = async(req,res) => {

    const {id} = req.params;

    const book = await bookmodel.findByIdAndDelete(id);

    if(!book){
       return res.status(404).json ({
            success : false ,
            message : ` Book not found for id :${id}`
        })
    }

    await bookmodel.findByIdAndDelete(id);

    res.status(200).json({
        success : true,
        message : "Book deleted successfully"
    })


}