import { productsModels } from "./models/products.model.js";

    class ProductsMongo {
    
        async getProducts (obj) {
        const {limit, page} = obj
            try { 
                const products = await productsModels.paginate({},{page,limit});
                const info = {
                status:'success',
                count: products.totalDocs,
                payload: products.docs,
                totalPages: products.totalPages,
                prevPages: page > 1 ? page - 1 : null,
                nextPages: page < products.totalPages ? page + 1 : null,
                prevLink: page > 1 ? `http://localhost:8080/api/products?page=${+page-1} `:null,
                nextLink: page < products.totalPages ? `http://localhost:8080/api/products?page=${+page+1}` : null,
                hasPrevPages: true ?page > 1:false,
                hasNextPages: true ?page < products.totalPages:false


                }
                return {info};
            } catch (error) {
                return error;
            }
        }
    async addProducts (obj){
        try{
        const newProducts = await productsModels.create(obj)
        return newProducts
        }
        catch (error){
            return error
        }
    }
    async getProductById (id){
        try{
        const product = await productsModels.findById(id)
        return product
        }
        catch (error){
            return error
        }
    }
    async updateProduct (id,obj){
        try{
        const product = await productsModels.updateOne({_id:id},{...obj})
        return product
        }
        catch (error){
            return error
        }
    }
    async deleteProduct (id){
        try{
        const product = await productsModels.findByIdAndDelete(id)
        return product 
        }
        catch(error){
            return error
        }
    }
}
export const productsMongo = new ProductsMongo()