import express from "express"
import exphbs from 'express-handlebars'
import routerViews from "./routes/views.routes.js"
import routerCarts from "./routes/carts.routes.js"
import routerProducts from "./routes/products.routes.js"


// HTTP
const app = express()
const PORT = 8080
const HTTPserver = app.listen(PORT, () => {
    console.log("Server Online")
})

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./src/public'))

// EXPRESS-HANDLEBARS
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// RUTAS
app.use('/', routerViews)
app.use('/api/carts', routerCarts)
app.use('/api/products', routerProducts)

// WEBSOCKET
import { configureSocket } from './socketServer.js'
configureSocket(HTTPserver, '/realtimeproducts')

