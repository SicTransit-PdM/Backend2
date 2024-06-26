import fs from 'fs/promises'
import Cart from '../models/Cart.js'
import * as path from 'path'
import { __dirname } from '../path.js'

class CartManager {
    constructor(PATH){
        //this.path = path.join(__dirname, '..', 'data', 'carts.JSON')
        this.path = PATH
    }
    // METODOS
    async addId(){
        const data = await this.getCarts()
        const lastId = data.length == 0 ? 1 : data[data.length-1].id+1
        console.log('ID: Assigned id =>', lastId)
        return lastId
    }
    async getCarts(){
        const read = await fs.readFile(this.path, 'utf-8')
        const data = (read == '') ? [] : JSON.parse(read)
        return data
    }
    async getCartById(id){
        let data = await this.getCarts()
        let result = data.find(p => p.id == id)
        if(!result){
            console.error(`ERROR: Cart with "id: ${id}" not found`)
        }
        return result
    }
    async addCart(products){
        console.log('--------------------------')
        console.log('ADDING cart...')
        let data = await this.getCarts()
        let cartInitial = products ?? []
        console.log('Cart initial products =>', products)
        const newCart = new Cart(cartInitial)
        newCart.id = await this.addId()
        data.push(newCart)
        console.log(`ADDED: "Cart ${newCart.id}" added succesfully.`)
        await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
        return `Carrito ${newCart.id} agregado`
    }
    async deleteCart(id){
        console.log('--------------------------')
        console.log('DELETING cart => id: ', id)
        const data = await this.getCarts()
        const toDelete = await this.getCartById(id)
        console.log(`CHEKING: Cart to delete exists? =>`, toDelete ? true : false)
        if (toDelete){
            console.log(`DELETED: Cart with "id:${id}" was deleted succesfully.`)
            let index = data.findIndex(p => p.id == id)
            data.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
            return `Carrito ${id} eliminado`
        } else {
            return 'Carrito no encontrado'
        }
    }
    async addProductToCart(id, product){
        console.log('--------------------------')
        console.log('ADDING to cart => id: ', id, ' product: ', product.title)
        const data = await this.getCarts()
        const cart = data.find(c => c.id == id)
        let cartProducts = cart.products
        const productInCart = cartProducts.find(p => p.id == product.id)
        console.log(`CHECKING: "${product.title}" already exists? =>`, productInCart ? true : false)
        if(productInCart){
            let index = cartProducts.findIndex(p => p.id == product.id)
            cartProducts[index].quantity++ 
            console.log(`ADDED: Product ${product.title} quantity modified successfully`)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
            return `Agregado 1 "${product.title}". Total: ${productInCart.quantity}`
        } else {
            const newProduct = {
                id: product.id,
                quantity: 1,
            }
            cartProducts.push(newProduct)
            console.log(`ADDED: Product ${product.title} added successfully`)
            await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
            return `Agregado nuevo producto: "${product.title}" al carrito ${cart.id}`
        }
    }
    async deleteProductFromCart(cartId, product){
        console.log('--------------------------')
        console.log(`DELETING ${product.title} from cart ${cartId} => id: `, product.id)
        const data = await this.getCarts()
        const cart = data.find(c => c.id == id)
        if(!cart){ 
            console.error('ERROR: Invalid cart')
            return 'Carrito no existe'
        }
        let cartProducts = cart.products
        const toDelete = cartProducts.find(p => p.id == product.id)
        console.log(`CHECKING: "${product.title}" is in cart? =>`, toDelete ? true : false)
        if(toDelete){
            let index = cartProducts.findIndex(p => p.id == product.id)
            if(cartProducts[index].quantity>0){
                cartProducts[index].quantity--
                console.log(`DELETED: "${product.title}" quantity modified successfully`)
                await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
                return `Eliminado 1 => Total: ${toDelete.quantity}`
            } else {
                cartProducts.splice(index, 1)
                console.log(`DELETED: "${product.title}" deleted successfully from cart ${cartId}`)
                await fs.writeFile(this.path, JSON.stringify(data, null, '\t'))
                return `Producto eliminado`
            }
        } else {
            console.error(`ERROR: Product do not exists`)
            return `El producto no existe`
        }
    }
}

export default CartManager