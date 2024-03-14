import express from "express"
import ProductManager from "./ProductManager.js"

const app = express()
const PORT = 8080
const PATH = "./src/db.json"
const productManager = new ProductManager(PATH)


app.listen(PORT, () => {
    console.log("Server Online")
})

app.get("/", (req, res) => 
    res.send("Welcome")
)
app.get("/products", async (req, res) => {
    try {
        let limit = parseInt(req.query.limit)
        const products = await productManager.getProducts();
        let result = products.slice(0, limit)
        res.send(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id
        const product = await productManager.getProductById(id);
        res.send(product);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})