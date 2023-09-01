import { Router } from "express";
import { cartsMongo } from "../dao/cartsManager.js";

const router = Router()

router.get("/", async () => {
    try {
      const carts = await cartsMongo.getCarts()
      res.status(200).json({message:'carts', carts})
    }
    catch (erro){
      res.status(500).json({message: "Error interno del servidor"});
    }
  });

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      if(!cart){
        res.status(400).json({message:'id invalido'})
        }else{
      const cart = await cartsMongo.findById(+cid)
      res.status(200).json({message:'carts', cart})
    }}
    catch (erro){
      res.status(500).json({message: "Error interno del servidor"});
    }
  });
 
  router.post('/',async(req,res )=>{
    try{
    const createCart = await cartsMongo.createCart(req.body)
    res.status(200).json({message: 'Carts', cart:createCart})
  }
  catch (error){
    res.status(500).json({ error });
  }})

  router.post('/:cid/products/:pid',async(req,res )=>{
    const {cid, pid} = req.params
    try{
      const addProduct = await cartsMongo.addCart(cid, pid);
      res.status(200).json({message: 'producto agregado', cart:addProduct})
 }
  catch (error){
    res.status(500).json({ message: "Error interno del servidor" });
  }})
  router.put('/:cid',async(req,res )=>{
    const {cid} = req.params
    const obj = req.body
    try{
    const updateOne= await cartsMongo.updateOne(+cid, obj)
    res.status(200).json({message: 'carrito modificado', cart:updateOne})}
    catch (error){
      res.status(500).json({ message: "Error interno del servidor" });
  }})
  router.put('/:cid/products/:pid',async(req,res )=>{
    const {cid, pid} = req.params
    const obj = req.body.quantity
    try{
    const updateQuantity= await cartsMongo.updateQuantity(+cid,+pid,obj)
    res.status(200).json({message: 'cantidad modificada', cart:updateQuantity})}
  catch (error){
    res.status(500).json({ message: "Error interno del servidor" });
  }})

  router.delete('/:cid/products/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try {
        const removeFromCart = await cartsMongo.removeFromCart(+cid,+pid);
        if (!removeFromCart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }else{
        res.status(200).json({ message: 'eliminado del carrito', removeFromCart });}
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
    }
});
  router.delete('/:cid', async (req, res) => {
    const {cid} = req.params
    try {
        const deleteCart = await cartsMongo.deleteCart(+cid);
        if (!deleteCart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }else{
        res.status(200).json({ message: 'Carrito eliminado con éxito', deleteCart });}
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el carrito', error: error.message });
    }
});


export default router