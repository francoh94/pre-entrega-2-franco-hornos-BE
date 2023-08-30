import mongoose from "mongoose";

const cartsScheam = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    Products:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:{
                type:Number,
            }
        }
    ]
    })

export const cartsModels = mongoose.model('carts', cartsScheam)