import {Router} from 'express'
import productController from '../../src/controllers/Products.js'
import productControllerFB from '../../src/controllers/ProductosFB.js'
const routerProducts = new Router()
import soloAdmin from '../../helpers/admin.js'

routerProducts.get('/:id',async (req,res,next) => {
    const { id } = req.params
    const productos = await productController.getById(id)
    res.send(productos)
})

routerProducts.get('/', async (req,res,next) => {
    // const productos = await productController.getAll()
    const productosFB = await productControllerFB.getAll()
    res.send(productosFB)
    
})

//agrega un producto nuevo
routerProducts.post('/',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const newProducto = await productController.save(timestamp, nombre, descripcion, código, foto, precio, stock)
    console.log(newProducto)
    res.send(newProducto)
})

//actualiza un producto pasado por id
routerProducts.put('/:id',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const { id } = req.params;
    const upDateProducto = await productController.update(timestamp, nombre, descripcion, código, foto, precio, stock, Number(id))
    res.send(upDateProducto)
})

//borra el producto pasado por id y devuelve todo el array
routerProducts.delete('/:id',soloAdmin, async (req, res, next) => {
    const { id } = req.params;
    const deleteProducto = await productController.deleteById(id)
    console.log(deleteProducto)
    res.send(deleteProducto)
})

export default routerProducts
