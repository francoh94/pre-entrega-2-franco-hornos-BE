import mongoose from "mongoose";


const uri = "mongodb+srv://francotrading94:franco_trading@cluster0.ab4wfj0.mongodb.net/ecommerce_?retryWrites=true&w=majority";
mongoose.connect(uri)
.then (()=>console.log('conectado a tu ecommerce'))
.catch (error=>console.log(error))