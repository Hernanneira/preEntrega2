import admin from 'firebase-admin';
import fs from 'fs';
import productos from '../daos/productos/productos.json' assert { type: "json" };

const serviceAccount = JSON.parse(fs.readFileSync('./db/serviceAccountKey.json', 'utf8'));

await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ecommerceneira.firebaseio.com'
})
const db = admin.firestore();
const ecommerce = db.collection('ecommerce')
// await ecommerce.doc().set({productos});
console.log('base firebase conectada');

class Products {
    
async getAll() {
    try {
        const snapshot = await ecommerce.get();
        snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
    })
        return snapshot //en la consola me lo trae pero en thunder medio raro el objeto.
    } catch (error) {
        return []
    }
}
// async getById(id){
//     try {
//         this.connect()
//         const content =  await this.productosDAO.find({id: id}) // usando mongo
//         const elementosFiltrados = content.filter(e => e.id === (parseInt(id))) //trabajandolo en paralelo
//         this.disconnect()
//         if(elementosFiltrados.length === 0){
//             return({ error : 'producto no encontrado' })
//         } else {
//             return content
//         }
//     } catch (error) {
//         return({error})
//     }
// }

// async save(timestamp, nombre, descripcion, código, foto, precio, stock) {
//     try {
//         this.connect()
//         const content =  await this.productosDAO.find({})
//         let newId;
//         if(content.length == 0){
//             newId = 1;
//         }else {
//             newId = content[content.length - 1].id + 1;
//         }
//         const newObj = {
//             timestamp: new Date(),
//             nombre: nombre,
//             descripcion: descripcion,
//             código: código,
//             foto: foto,
//             precio: precio,
//             stock: stock,
//             id: newId
//         }
//         const newProduct = await this.productosDAO.insertMany(newObj)
//         this.disconnect()
//         return newProduct
//         }
//     catch (error) {
//         return(error)
//     }
// }

// async update(timestamp, nombre, descripcion, código, foto, precio, stock, id) {
//     try{
//         this.connect()
//         const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, id};
//         const updateProduct = await this.productosDAO.updateMany({id: id}, {$set: newProduct})
//         this.disconnect()
//         return updateProduct ; //me devuelve un objeto raro pero lo actualiza.
//     } catch (error) {
//         return(error)
//     }
// }
// async deleteAll(){
//     try {
//         this.connect()
//         await this.productosDAO.deleteAll({})
//         this.disconnect()
//         return "eliminado con exito"
//     } catch (error) {
//         console.log(error)
//         return "no pudo eliminarse"
//     }
// }

// async deleteById (id) {
//     try {
//         this.connect()
//         const elementosFiltrados = await this.productosDAO.deleteMany({id: id})
//         this.disconnect()
//         return elementosFiltrados 
//     } catch (error) {
//         return(error)
//     }
// }
}

const productControllerFB = new Products()

export default productControllerFB