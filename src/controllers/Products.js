import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductosSchema = new Schema({
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    código: { type: Number, required: true },
    foto: { type: String, required: false },
    precio: { type: Number, required: true },
    stock: { type: Number, default: false },
    id: { type: Number, default: false },
})

console.log("db mongoose conectada")

class Products {
        productosDAO = mongoose.model('productos', ProductosSchema);

    async connect(){
        await mongoose.connect('mongodb://localhost:27017/productos', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
    }

    async disconnect(){
        await mongoose.disconnect();
    }

    async getAll() {
        try {
            this.connect()
            const content = await this.productosDAO.find({})
            this.disconnect()
            return content
        } catch (error) {
            return []
        }
    }
    async getById(id){
        console.log(id)
        try {
            this.connect()
            const content =  await this.productosDAO.find({id: id}) // usando mongo
            const elementosFiltrados = content.filter(e => e.id === id) //trabajandolo en paralelo
            this.disconnect()
            if(elementosFiltrados.length === 0){
                return({ error : 'producto no encontrado' })
            } else {
                return content
            }
        } catch (error) {
            console.log('estamos en error')
            return({error})
        }
    }

    async save(timestamp, nombre, descripcion, código, foto, precio, stock) {
        try {
            this.connect()
            const content =  await this.productosDAO.find({})
            let newId;
            if(content.length == 0){
                newId = 1;
            }else {
                newId = content[content.length - 1].id + 1;
            }
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
            const newProduct = await this.productosDAO.insertMany(newObj)
            this.disconnect()
            return newProduct
            }
        catch (error) {
            return(error)
        }
    }

    async update(timestamp, nombre, descripcion, código, foto, precio, stock, id) {
        try{
            this.connect()
            const newProduct = {timestamp, nombre, descripcion, código, foto, precio, stock, id};
            const updateProduct = await this.productosDAO.updateMany({id: id}, {$set: newProduct})
            this.disconnect()
            return updateProduct ; //me devuelve un objeto raro pero lo actualiza.
        } catch (error) {
            return(error)
        }
    }
    async deleteAll(){
        try {
            this.connect()
            await this.productosDAO.deleteAll({})
            this.disconnect()
            return "eliminado con exito"
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }

    async deleteById (id) {
        try {
            this.connect()
            const elementosFiltrados = await this.productosDAO.deleteMany({id: id}) //me devuelve un objeto raro pero lo elimina.
            this.disconnect()
            return elementosFiltrados 
        } catch (error) {
            return(error)
        }
    }
}

const productController = new Products()

export default productController