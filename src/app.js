import express from "express"
import routerCarts from "./routes/carts.routes.js"
import routerProducts from "./routes/products.routes.js"

const app = express()
const PORT = 8080
const router = express.Router()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(PORT, () => {
    console.log("Server Online")
})

app.get("/", (req, res) => 
    res.send("Welcome")
)


router.use('/api/carts', routerCarts)
router.use('/api/products', routerProducts)