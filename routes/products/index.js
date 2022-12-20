import {Router} from 'express'
const routerProducts = new Router()
import soloAdmin from '../../helpers/admin.js'
import productsDAO from '../../src/daos/productos/productosDAO.js'

routerProducts.get('/:id',async (req,res,next) => {
    const { id } = req.params
    const productosD = await productsDAO.getById(Number(id))
    res.send(productosD)
})

routerProducts.get('/', async (req,res,next) => {
    const productosD = await productsDAO.getAll()
    res.send(productosD)
})

//agrega un producto nuevo
routerProducts.post('/',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const newProductoFBS = await productsDAO.save(timestamp, nombre, descripcion, código, foto, precio, stock)
    res.send(newProductoFBS)
})

//actualiza un producto pasado por id
routerProducts.put('/:id',soloAdmin, async (req, res, next) => {
    const { timestamp, nombre, descripcion, código, foto, precio, stock } = req.body
    const { id } = req.params;
    const upDateProductoFBS = await productsDAO.update(timestamp, nombre, descripcion, código, foto, precio, stock, Number(id))
    res.send(upDateProductoFBS)
})

//borra el producto pasado por id y devuelve todo el array
routerProducts.delete('/:id',soloAdmin, async (req, res, next) => {
    const { id } = req.params;
    const deleteProductoFBS = await productsDAO.deleteById(id)
    res.send(deleteProductoFBS)
})

export default routerProducts
