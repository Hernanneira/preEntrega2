import {Router} from 'express'
import cartController from '../../src/controllers/Cart.js'
const routerCart = new Router()


routerCart.get('/:id_carrito/productos', async (req,res,next) => {
    const { id_carrito } = req.params
    const productos = await cartController.getProductCartById(id_carrito)
    res.send(productos)
})

routerCart.post('/', async (req, res, next) => {
    const newCart = await cartController.newCart()
    console.log(newCart)
    res.send(newCart)
})

routerCart.post('/:id_carrito/productos/:id', async (req,res,next) => {
    const { id_carrito, id } = req.params
    const addProductos = await cartController.addToCart(id_carrito, id)
    res.send(addProductos)
})

routerCart.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await cartController.deleteCartById(id)
    res.send(deleteProducto)
})

routerCart.delete('/:id_carrito/productos/:id', async (req,res,next) => {
    const { id_carrito, id } = req.params
    const addProductos = await cartController.deleteProductInCartById(id_carrito, id)
    res.send(addProductos)
})

export default routerCart