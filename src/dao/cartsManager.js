import { cartsModels } from "./models/carts.model.js";


class CartsMongo {

    async getCarts(){
        try{
        const carts = await cartsModels.find({})
        return carts
        }
        catch(error){
            return error
        }
    }
    async findById(id){
        try{
        const cart = await cartsModels.findById(id).populate('products.product');
        return cart
        }
        catch(error){
            return error
        }
    }
    async createCart(obj){
        try{
        const carts = await cartsModels.create(obj)
        return carts
        }
        catch(error){
            return error
        }
    }
    async updateOne (id,obj){
        try{
        const cart = await cartsModels.findOneAndReplace({_id:id},{...obj})
        return cart
        }
        catch(error){
            return error
        }
    }
    async updateQuantity (cid,pid,obj){
        try{
        const cart = await cartsModels.updateOne({_id:cid,_id:pid},{...obj})
        return cart
        }
        catch(error){
            return error
        }
    }
    async removeFromCart(cid,pid){
        try{
        const cart = await cartsModels.getCarts(cid)
        if(!cart) throw new error('cart no encontrado')
        const updatedCart = await cartsModels.updateOne(
            { _id: cid },
            { $pull: { products: { _id: pid } } }
          );
        
        return updatedCart
        }
        catch(error){
            return error
        }
    }
    async deleteCart(cid){
        try{
        const cart = await cartsModels.findByIdAndDelete(cid)
        return cart
        }
        catch(error){
            return error
        }
    }
}

export const cartsMongo = new CartsMongo();

