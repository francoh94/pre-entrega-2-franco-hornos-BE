
import express from 'express';
import { productsMongo } from '../dao/productsManager.js'; 
import {cartsMongo} from '../dao/cartsManager.js'

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
      const products = await productsMongo.getProducts({ limit: 10, page: 1 });
      res.render('product_list', { products: products.info.payload }); 
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartsMongo.findById(cartId);
        if (cart) {
            res.render('carts', { cart }); 
          } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  

export default router;
