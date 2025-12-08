const {usermodel,bookmodel} = require('../models'); 


exports.getallusers = async (req, res) => {


    const users = await usermodel.find();


    if(!users  || users.length === 0){
       return res.status(404).json ({
            success : false ,
            message : `No users found`
        })
    }

    res.status(200).json({
        success : true,
        data : users
    })
}

exports.getuserbyid = async (req, res) => {

    const {id} = req.params;
    // const user = await usermodel.findById({_id : id});
    const user = await usermodel.findById(id);

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

}


exports.createuser = async (req, res) => {

    const {data} = req.body;
    
    if(!data){
        return res.status(400).json({
            success : false,
            message : "User data is required to create a user"
        })
    }

    await usermodel.create(data);

    const getallusers = await usermodel.find();


    res.status(201).json({
        success : true,
        message : "User created successfully",
        data : getallusers
    })


}


exports.updateuserbyid = async (req, res) => {

    const {id} = req.params;

    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success : false,
            message : "User data is required to update a user"
        })
    }

    const user = await usermodel.findById(id);

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :${id}`
        })
    }

    const updateduser = await usermodel.findByIdAndUpdate(id, data, {new : true});

    res.status(200).json({
        success : true,
        data : updateduser,
        message : "User updated succesfully"

    })
}


exports.deleteuserbyid = async (req, res) => {

    const {id} = req.params;

    const user = await usermodel.findById(id);

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :${id}`
        })
    }

    await usermodel.findByIdAndDelete(id);

    res.status(200).json({
        success : true,
        message : "User deleted successfully"
    })

}


exports.subscriptiondetails = async (req, res) => {

    const {id} = req.params;

    const user = await usermodel.findById(id);

    if(!user){
       return res.status(404).json ({
            success : false ,
            message : `User not found for id :${id}`
        })
    }

    const getdateindays = (data = "") => {
        let date;   
        if(data ) {
            date = new Date(data);
        } else {
            date = new Date();
        }   

        let days = Math.floor(date / (1000*60*60*24));
        return days;
    }

    const subscriptiontype = (date) => {

        if(user.subscriptiontype === "Basic"){
            date.setDate(date.getDate() + 90);
        } else if(user.subscriptiontype === "Standard"){
            date.setDate(date.getDate() + 180);
        }else if(user.subscriptiontype === "Premium"){
            date.setDate(date.getDate() + 365); 
        }

        return date;
    }
    

    let returndate = getdateindays(user.returndate);
    let subscriptiondate = getdateindays(user.subscriptiondate);
    let currentdate = getdateindays();
    let subscriptionexpirydate = subscriptiontype(subscriptiondate);

    const data = {  
        ...user._doc,
        subscriptionexpiry : subscriptionexpirydate < currentdate,
        subscriptiondaysleft : subscriptionexpirydate - currentdate,
        daysleftforexpiration : returndate - currentdate,
        returndate : returndate < currentdate ? "book is overdue" : user.returndate,
        fine : returndate < currentdate ? (subscriptionexpirydate < currentdate ? 200 : 100) : 0
    };

    res.status(200).json({
        success : true,
        data 
    })

}