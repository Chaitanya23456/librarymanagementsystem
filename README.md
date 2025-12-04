# librarymanagementsystem
    this is a library management API backend for the management of users and the books 

# Routes and the endpoints  
      

## /users 

   GET : Get all the list of users in the system 
   POST : Create/Register a new user

## /users{id}

  GET : Get a user by their id
  POST : updating a user by their id
  DELETE : deleting a user by their id (check user still has an issued book , is there any fine need to be collected)

## /user/subscriptiondetails/{id}
    
    GET : get a user subscription details by their id
    >> date of subscription
    >> valid til ?
    >> fine if any ? 

## /books

    GET : get all the books in the system
    POST : add a new book to the system



## /books/{id}

    GET : get a book by its id
    PUT : update a book by its id
    DELETE : delete a book by its id


## /books/issued 

    GET : get all the issued books


## /books/issued/withfine 

    GET : get all issued books with their fine amount         

## subscription types
    >> basic (3 months)
    >> standard (6 months)
    >> premium (12 months)

>> if a user missed the renewal date, then the user should be collected with $100
>> if a user misses the subscription , then the user is expected to pay $100
>> if a user misses both renewal & subscription, then the collected amount should be $200


## commands :

npm init
npm i
npm i express
npm i nodemon --save-dev
npm run dev