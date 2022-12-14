import admin from 'firebase-admin';
import fs from 'fs';
// import productos from '../daos/productos/productos.json' assert { type: "json" };

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
        let elementosFiltrados = []
        const snapshot = await ecommerce.get();
        snapshot.docs.forEach((doc) => {
            const list = doc.data().productos
            console.log(list)
            for (const prop in list) {
                let getAllProduct = (list[prop])
                elementosFiltrados.push(getAllProduct)
                console.log(elementosFiltrados)
            }
                // elementosFiltrados = list.filter(e => e)
        })

        return elementosFiltrados
    } catch (error) {
        return []
    }
}
async getById(id){
    try {
        const snapshot = await ecommerce.get();
        let elementosFiltrados = []
        snapshot.docs.forEach((doc)=>{
            const list = doc.data().productos
            elementosFiltrados = list.filter(e => e.id === (parseInt(id)))
        })
        if(elementosFiltrados.length === 0){
            return({ error : 'producto no encontrado' })
        } else {
            return elementosFiltrados
        }
    } catch (error) {
        return({error})
    }
}

async save(timestamp, nombre, descripcion, código, foto, precio, stock) {
    try {
        const content = await this.getAll()
        let newId;
        if (content.length == 0) {
            newId = 1;
        }else {
            newId = content[content.length - 1].id + 1;
        }
        const indexContent  = content.length 

        const newObj = {
            timestamp: new Date(),
            nombre: nombre,
            descripcion: descripcion,
            código: código,
            foto: foto,
            precio: precio,
            stock: stock,
            id: newId
        }

        const newProduct = {
            ...content,
            [indexContent]: newObj
        }
        console.log(newProduct)
        const postNewProduct = await ecommerce.doc('TrpNtUYLzUCUwqUNIrY8').update({productos: newProduct});
        console.log(postNewProduct)
        return postNewProduct
        }
    catch (error) {
        return(error)
    }
}

async update(timestamp, nombre, descripcion, código, foto, precio, stock, id) {
    try{
        const content = await this.getAll()
        const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, id};
        const elementosFiltrados = content.filter(e => e.id !== (parseInt(id)))
        if(elementosFiltrados.length === content.length){
            return({ error : 'producto no encontrado' })
        } else {
            elementosFiltrados.push(newProduct)
        }
        console.log(elementosFiltrados)
        const updateProduct = await ecommerce.doc('TrpNtUYLzUCUwqUNIrY8').update({productos: elementosFiltrados});
        return updateProduct;
    } catch (error) {
        return(error)
    }
}

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

async deleteById (id) {
    try {
        const content = await this.getAll()
        const elementosFiltrados = content.filter(e => e.id !== (parseInt(id)))
        console.log(elementosFiltrados)
        if(elementosFiltrados.length === content.length){
            return({ error : 'producto no encontrado' })
        } else {
            const updateProduct = await ecommerce.doc('TrpNtUYLzUCUwqUNIrY8').update({productos: elementosFiltrados});
            return elementosFiltrados;
        }
    } catch (error) {
        return({error})
    }
}
}

const productControllerFB = new Products()

export default productControllerFB