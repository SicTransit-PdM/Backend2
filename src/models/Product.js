class Product {
    static id = 0
    constructor(title, description, code, price, status = true, stock, category, thumbnails = []) {
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = status
        this.stock = stock
        this.category = category
        this.thumbnails = thumbnails
        this.id = id++
    }
}

export default Product