import {Router} from 'express'
import productController from '../../src/controllers/Products.js'
import productControllerFB from '../../src/controllers/ProductosFB.js'
const routerProducts = new Router()
import soloAdmin from '../../helpers/admin.js'

routerProducts.get('/:id',async (req,res,next) => {
    const { id } = req.params
    const productos = await productController.getById(id)
    const productosFB = await productControllerFB.getById(Number(id))
    res.send(productos)
})

routerProducts.get('/', async (req,res,next) => {
    const productos = await productController.getAll()
    const productosFB = await productControllerFB.getAll()
    res.send(productos)
    
})

//agrega un producto nuevo
routerProducts.post('/',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const newProducto = await productController.save(timestamp, nombre, descripcion, código, foto, precio, stock)
    const newProductoFB = await productControllerFB.save(timestamp, nombre, descripcion, código, foto, precio, stock)
    res.send(newProductoFB)
})

//actualiza un producto pasado por id
routerProducts.put('/:id',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const { id } = req.params;
    const upDateProducto = await productController.update(timestamp, nombre, descripcion, código, foto, precio, stock, Number(id))
    const upDateProductoFB = await productControllerFB.update(timestamp, nombre, descripcion, código, foto, precio, stock, Number(id))
    res.send(upDateProductoFB)
})

//borra el producto pasado por id y devuelve todo el array
routerProducts.delete('/:id',soloAdmin, async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await productController.deleteById(id)
    const deleteProductoFB = await productControllerFB.deleteById(id)
    res.send(deleteProductoFB)
})

export default routerProducts
