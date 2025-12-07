const express = require('express');
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route : /users
 * Method : GET 
 * Description : Get all the list of users in the system 
 * Access : public
 * Parameters : None
 * 
 */

router.get('/',(req,res)=>{
    res.status(200).json({
        success : true,
        data : users
    })
})

/**
 * Route : /users/:id
 * Method : GET 
 * Description : Get a user by their id
 * Access : public
 * Parameters : id
 * 
 */

router.get('/:id',(req,res)=>{


    const {id} = req.params;

    const user = users.find((each)=>each.id === id)

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :  ${id}`
        })
    }

    res.status(200).json({
        success : true,
        data : user
        

    })
})


/**
 * Route : /users/
 * Method : POST
 * Description : Create/Register a new user
 * Access : public
 * Parameters : none
 * 
 */

router.post('/',(req,res)=>{
    const {id,name,email,subscriptionType,subscriptionDate,age } = req.body;

    if (!id || !name || !email || !subscriptionType || !subscriptionDate || !age) {
          return res.status(404).json({
            success : false ,
            message : "Please provide required feild"
          })
    }


    const user = users.find((each)=>each.id === id)

    if(user){
       return res.status(409).json ({
            success : false ,
            message : `User already exists with id : ${id}`
        })
    }

    users.push ({
        id,
        name,
        email,
        subscriptionType,
        subscriptionDate
    })

    res.status(201).json({
        success : true,
        message : "User added succesfully",
        data : {id,name,email,subscriptionType,subscriptionDate,age } 
        

    })


})


/**
 * Route : /users/:id
 * Method : PUT
 * Description : updating user by their id
 * Access : public
 * Parameters : id
 * 
 */


router.put('/:id',(req,res)=>{
   const {id} = req.params;

   const {data} = req.body;

   const user = users.find((each)=>each.id === id)

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :${id}`
        })
    }

    const updateduser = users.map((each)=>{
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
        data : updateduser,
        message : "User updated succesfully"
        

    })
})

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : deleting user by their id
 * Access : public
 * Parameters : id
 * 
 */

router.delete('/:id',(req,res)=>{
   const {id} = req.params;

   const user = users.find((each)=>each.id === id)

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :${id}`
        })
    }

    const updateduser = users.filter((each)=>each.id !== id)

    // const index = users.indexOf(user)
    // users.splice(index,1)

    res.status(200).json({
        success : true,
        data : updateduser,
        message : "User deleted succesfully"
        

    })
})



/**
 * Route : /users/subscriptiondetails/:id
 * Method : Get
 * Description : get all the subscription details by their user id
 * Access : public
 * Parameters : id
 * 
 */

router.get('/subscriptiondetails/:id', (req,res) => {
    const {id} = req.params;

    const user = users.find(each => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found for id: ${id}`
        });
    }

    // Convert subscription type to number of days
    const subscriptionDays = {
        "Basic": 90,
        "Standard": 180,
        "Premium": 365
    };

    // Normalize subscription type (capitalize first letter)
    const subType = user.subscriptionType.charAt(0).toUpperCase() + user.subscriptionType.slice(1).toLowerCase();
    const subDuration = subscriptionDays[subType] || 0;

    // Dates
    const subscriptionStart = new Date(user.subscriptionDate);
    const subscriptionEnd = new Date(subscriptionStart.getTime() + subDuration*24*60*60*1000);
    const today = new Date();

    let daysLeftForSubscription = Math.ceil((subscriptionEnd - today)/(1000*60*60*24));
    
    let daysLeftForReturn = null;
    let returnDateText = null;
    let fine = 0;

    if(user.returndate){
        const returnDate = new Date(user.returndate);
        daysLeftForReturn = Math.ceil((returnDate - today)/(1000*60*60*24));
        returnDateText = daysLeftForReturn < 0 ? "book is overdue" : user.returndate;

        if(daysLeftForReturn < 0){
            fine = daysLeftForSubscription < 0 ? 200 : 100;
        }
    }

    const data = {
        ...user,
        subscriptionexpiry: today > subscriptionEnd,
        subscriptiondaysleft: daysLeftForSubscription,
        daysleftforexpiration: daysLeftForReturn,
        returndate: returnDateText,
        fine: fine
    };

    res.status(200).json({
        success: true,
        data
    });
});



// app.use((req, res) => {
//     res.status(501).json({ message: "not built" });
// });


module.exports = router;