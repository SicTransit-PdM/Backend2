import express from "express"
import routerCarts from "./routes/carts.routes.js"
import routerProducts from "./routes/products.routes.js"

const app = express()
const PORT = 8080

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => 
    res.send("Welcome")
)

// RUTAS
app.use('/api/carts', routerCarts)
app.use('/api/products', routerProducts)


app.listen(PORT, () => {
    console.log("Server Online")
})