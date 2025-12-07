const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json")
const router = express.Router();

/**
 * Route : /books
 * Method : GET 
 * Description : Get all the list of books in the system 
 * Access : public
 * Parameters : None
 * 
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success : true,
        data : books
    })
})


/**
 * Route : /books/:id
 * Method : GET 
 * Description : Get a book by their id
 * Access : public
 * Parameters : id
 * 
 */

router.get('/:id',(req,res)=>{


    const {id} = req.params;

    const book = books.find((each)=>each.id === id)

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
})



/**
 * Route : /books/
 * Method : POST
 * Description : Create/Register a new book
 * Access : public
 * Parameters : none
 * 
 */

router.post('/',(req,res)=>{
    const {id,title,author,genre,year,available} = req.body;

    if (!id || !title|| !author || !genre|| !year|| !available) {
          return res.status(404).json({
            success : false ,
            message : "Please provide required feild"
          })
    }


    const book = books.find((each)=>each.id === id)

    if(book){
       return res.status(409).json ({
            success : false ,
            message : `Book already exists with id : ${id}`
        })
    }

    books.push ({
        id,
        title,
        author,
        genre,
        year,
        available
    })

    res.status(201).json({
        success : true,
        message : "Book added succesfully",
        data : {id,title,author,genre,year,available} 
        

    })


})



/**
 * Route : /books/:id
 * Method : PUT
 * Description : updating book by their id
 * Access : public
 * Parameters : id
 * 
 */


router.put('/:id',(req,res)=>{
   const {id} = req.params;

   const {data} = req.body;

//    if(!data || Object.keys(data).length === 0) {
//     return res.status(400).json({
//         success : false,
//         message : "Please provide data to update"
//     })
//    }


   const book = books.find((each)=>each.id === id)

    if(!book){
       return res.status(404).json ({
            success : false ,
            message : ` Book not found for id :${id}`
        })
    }

    const updatedbook = books.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data,
            }
        }
        return each
    })

    res.status(200).json({
        success : true,
        data : updatedbook,
        message : "Book updated succesfully"
        

    })
})



/**
 * Route : /books/:id
 * Method : DELETE
 * Description : deleting book by their id
 * Access : public
 * Parameters : id
 * 
 */

router.delete('/:id',(req,res)=>{
   const {id} = req.params;

   const book = books.find((each)=>each.id === id)

    if(!book){
       return res.status(404).json ({
            success : false ,
            message : `Book not found for id :${id}`
        })
    }

    const updatedbook = books.filter((each)=>each.id !== id)

    // const index = users.indexOf(user)
    // users.splice(index,1)

    res.status(200).json({
        success : true,
        data : updatedbook,
        message : "book deleted succesfully"
        

    })
})


/**
 * Route : /books/issued/foruser
 * Method : GET
 * Description : get all issued books
 * Access : public
 * Parameters : none
 * 
 */

router.get('/issued/foruser',(req,res)=>{
   
   
   // const issuedbook = books.filter((each)=>each.available === true)

   const userwithissuedbook = users.filter((each)=>{
    if(each.issuedBooks){
        return each;
    }
   })


   const issuedBooks = [];
   userwithissuedbook.forEach((each)=>{
       const book = books.find((book)=>book.id === each.issuedBooks);

       book.issuedby = each.name;
       book.issueddate =  each.issueddate;
       book.returndate = each.returndate;

       issuedBooks.push(book)
   })

   if(!issuedBooks === 0){
    return res.status(404).json({
        success : false,
        message : "No  books issued yet"
    })
   }
    res.status(200).json({
        success : true,
        data : issuedBooks
        
    })
})


module.exports = router;