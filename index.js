const express=require('express')
const mongoose=require('mongoose')
const {Expense,User}=require('./schema.js')
const bodyParser = require('body-parser')
const cors=require('cors')
const app=express()
app.use(bodyParser.json())
app.use(cors())


const connectdb=async()=>{
    try{
    //when the connection established then it will listen on to the port or else the listen will wait
    await mongoose.connect("mongodb+srv://merntraining:mern123@cluster0.jwzqli4.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0")
    console.log("DB Connection is  Established")
    //when the server is connect to the database then only it should listen to port 8000
    const port=process.env.PORT || 7000
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`)
    })
    }
    catch(e){
        console.log(" DB Connection is not Established")
    }
}
connectdb();

//add to the DB
app.post('/add_expense',async(req,res)=>{
    console.log(req.body);
    try{
        await Expense.create({
            "amount":req.body.amount,
            "category":req.body.category,
            "date":req.body.date
        })
        res.status(201).json({
            "status":"success",
            "message":"Entry successful"
        })
    }
    catch(e){
        res.status(500).json({
            "status":"failure",
            "message":"Entry Unsuccessful",
            "error":e
        })
    }
})

//fetch data from DB
app.get('/get_expense',async(req,res)=>{
    try{
        const expensedetails=await Expense.find().sort({"amount":-1})
        res.status(200).json(expensedetails)
    }
    catch(e){
        res.status(500).json({
            "status":"failure",
            "message":"couldn't fetch data",
            "error":e
        })
    }
})


//delete from DB
app.delete('/delete_expense/:id',async(req,res)=>{
    try{
        const deleted=await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted)
    }
    catch(e){
        res.status(500).json({
            "status":"failure",
            "message":"couldn't delete data",
            "error":e
        })
    }
})


//Update to DB
app.patch('/update_expense/:id',async(req,res)=>{
    try{
        const updated=await Expense.findByIdAndUpdate(req.params.id,{
                "amount":req.body.amount,
                "category":req.body.category,
                "date":req.body.date
        })
        res.status(200).json(updated)
    }
    catch(e){
        res.status(500).json({
            "status":"failure",
            "message":"couldn't update data",
            "error":e
        })
    }
})
