import { cartsModels } from "./models/carts.model.js";



class CartsMongo {

    async getCarts(){
        try {
            const carts = await cartsModels.find({});
            return {carts};
        } catch(error) {
            console.log(error);
            return { error: 'Error retrieving carts' };
        }}
    async findById(id){
        try{
            const cart = await cartsModels.findById(id).populate('Products.id');
            return cart
        }
        catch(error){
            console.log(error);
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
    async addCart(cid, pid) {
        try {
            const cart = await this.findById(cid);
const product = {
                id: pid,
                quantity: 1, };
cart.Products.push(product);

            
            await cart.save();

            return cart;
        } catch (error) {
            return error;
        }
    }
    async updateOne (id,obj){
        try{
        const cart = await cartsModels.findOneAndReplace({_id:id},obj)
        return cart
        }
        catch(error){
            return error
        }
    }
    async updateQuantity (cid,pid,obj){
        try{
        const cart = await cartsModels.updateOne({ _id: cid, "Products.id": pid },
        { $set: { "Products.$.quantity": obj } })
        return cart
        }
        catch(error){
            return error
        }
    }
    async removeFromCart(cid,pid){
        try{
        const cart = await cartsModels.findById(cid)
        if(!cart) throw new error('cart no encontrado')
        const updatedCart = await cartsModels.updateOne(
            { _id: cid },
            { $pull: { Products: { _id: pid } } }
          );
        
        return updatedCart
        }
        catch(error){
            return error
        }
    }
    async deleteCart(cid){
        try{
        const cart = await cartsModels.findById(cid);
        const emptyArray = cart.Products= [];
        const updateCart = await cartsModels.updateOne(
            {_id : cid},
            {Products : emptyArray}
        )
        return updateCart
        }
        catch(error){
            return error
        }
    }
}

export const cartsMongo = new CartsMongo();

