const isAdmin = true
const soloAdmin = (req,res,next) => {
    if (isAdmin) {
        next()
    } else{
        res.send({ error : -1, descripcion: "ruta 'x' método 'y' no autorizada" })
    }
}

export default soloAdmin