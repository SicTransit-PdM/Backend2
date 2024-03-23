import express from 'express'
import CartManager from "../controllers/CartManager.js"
import ProductManager from '../controllers/ProductManager.js'

const routerCarts = express.Router()
const productManager = new ProductManager('./src/data/products.JSON')
const cartManager = new CartManager('./src/data/carts.JSON')

routerCarts.post("/", async (req, res) => {
    try {
        let newCart = cartManager.addCart()
        res.status(200).json(newCart)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routerCarts.get("/", async (req, res) => {
    try {
        let result = await cartManager.getCarts()
        res.status(200).json(result)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routerCarts.get("/:cid", async (req, res) => {
    try {
        let id = req.params.cid
        let cart = await cartManager.getProductsInCart(id)
        res.status(200).json(cart)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routerCarts.post("/:cid/product/:pid", async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let product = await productManager.getProductById(pid);
        let result = await cartManager.addToCart(cid, product)
        res.status(200).json(result)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})



export default routerCarts