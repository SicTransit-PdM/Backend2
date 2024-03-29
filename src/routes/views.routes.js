import express from 'express'

const routerViews = express.Router()


routerViews.get("/", (req, res) => {
    try {
        const context = {
            title: 'Home',
        }
        if (req.user) {
            const user = {
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                email: req.user.email,
            }
            context.user = user
        }
        res.render('index', context)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

routerViews.get('/realtimeproducts', (req, res) => {
    try {
        const context = {
            title: 'Products',
            script: 'js/realTimeProducts.js'
        }
        res.render('realtimeproducts', context)
    } catch(error) {
        res.status(400).json({
            message: error.message
        })
    }
})

export default routerViews