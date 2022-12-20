let productsDAO
import * as dotenv from 'dotenv' 
dotenv.config()

switch (process.env.PERS) {
    // case 'json':
    //     const {default: ProductosDaoArchivo} = await import('./productos.json')
    //     productosDAO = new ProductosDaoArchivo()
    //     break;

    case 'firebase':
        const {default: productControllerFB} = await import('../../controllers/ProductosFB.js')
        productsDAO = productControllerFB
        break;   
        
    case 'mongodb':
        const {default: productController} = await import('../../controllers/Products.js')
        productsDAO = productController
        break;    
}
export default productsDAO
