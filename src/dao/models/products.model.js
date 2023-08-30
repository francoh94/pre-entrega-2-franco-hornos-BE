import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const productsScheam = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        index:true
    },
    price:{
        type: Number,
        required: true,
        index:true
    },
    thumbnail:{
        type: String,
        required: true,
        index:true
    },
    code:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    })
productsScheam.plugin(mongoosePaginate)
export const productsModels = mongoose.model('products', productsScheam)