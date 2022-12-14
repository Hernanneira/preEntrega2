import express from 'express'
const app = express()
import routerCart from './routes/cart/index.js'
import routerProducts from './routes/products/index.js'
//
// import admin from 'firebase-admin';
// import fs from 'fs';
// import productos from './src/daos/productos/productos.json' assert { type: "json" };
// //

app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/cart', routerCart, )
app.use('/api/products', routerProducts)

const server = app.listen(process.env.PORT || 8080, () =>{ 
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/api',(req,res) =>
    res.send('bienvenidos a la api')
)
//
// const serviceAccount = JSON.parse(fs.readFileSync('./db/serviceAccountKey.json', 'utf8'));

//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: 'https://ecommerceneira.firebaseio.com'
//     })
//     const db = admin.firestore();
//     const ecommerce = db.collection('ecommerce')
//     ecommerce.doc().set({productos});
//     // console.log('base firebase conectada');
