import express from 'express'
import ProductManager from "../controllers/ProductManager.js"

const routerProducts = express.Router()
const productManager = new ProductManager()

routerProducts.get('/', async (req, res) => {
    try {
        let limit = parseInt(req.query.limit)
        const products = await productManager.getProducts();
        let result = products.slice(0, limit)
        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
routerProducts.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await productManager.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
routerProducts.post('/', async (req, res) => {
    try {
        const newProduct = productManager.addProduct()
        res.status(200).json(newProduct)
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routerProducts.put('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let result = await productManager.updateElement(id, req.body)
        res.status(200).json(result)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
routerProducts.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        let result = await productManager.deleteElement(id) 
        res.status(200).json(result)
    } catch(error) {
        console.error('Error', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


export default routerProducts