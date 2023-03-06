const express=require("express");
const mongoose=require("mongoose");
const app=express()
var routes = require('./routes/routes');
const cors = require('cors');


app.use(cors(
    {
        origin:"http://localhost:8086"
    }
))



mongoose.set('strictQuery', true);
app.listen(5100, function check(error)
{
    if(error)
    console.log("Error...!!!")
    else
    console.log("started")
});


mongoose.connect("mongodb://127.0.0.1:27017/student",{
    useNewUrlparser:true,useUnifiedTopology:true
}, function checkDb(error)
{
    if(error)
    {
        console.log('error')
    }else{
        console.log("sucessfully connected")
    }
});

app.use(express.json());

app.use(routes);



