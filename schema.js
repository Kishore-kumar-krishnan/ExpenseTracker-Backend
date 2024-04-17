const mongoose=require('mongoose')
// we need to define schema for DB 
const ExpenseDetails=new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }

})

const UserDetails=new mongoose.Schema({
    Username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})


// creating a model and it is Collection name
const Expense=mongoose.model('ExpenseDetails',ExpenseDetails);
const User=mongoose.model('UserDetails',UserDetails)
module.exports={Expense,User}
