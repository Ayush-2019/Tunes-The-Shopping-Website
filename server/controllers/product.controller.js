const {productService} = require('../services');

const productController = {
    async addProduct(req, res, next){
        try{
            const product = await productService.addProduct(req.body);
            res.json(product);
        }catch(err){
            next(err)
        }
    },

    async getProductById(req, res, next){
        try{
            
            const _id = req.params.id;
            const product = await productService.getProductById(_id);

            res.json(product);

        }catch(err){
            next(err)
        }
    },

    async updateProductById(req, res, next){
        try{
            
            const _id = req.params.id;
            const product = await productService.updateProductById(_id, req.body);

            res.json(product);

        }catch(err){
            next(err)
        }
    },
    async deleteProductById(req, res, next){
        try{
            
            const _id = req.params.id;
            const product = await productService.deleteProductById(_id);

            res.json(product);

        }catch(err){
            next(err)
        }
    },

    async allProducts(req, res, next){
        try{
            
            const product = await productService.allProducts(req);

            res.json(product);

        }catch(err){
            next(err)
        }
    },

    async paginateProducts(req, res, next){
        try{
            
            const product = await productService.paginateProducts(req);
            res.json(product);

        }catch(err){
            next(err)
        }
    },

    async uploadImage(req, res, next){
        try{
                const pic = await productService.uploadImage(req);

                res.json(pic);
        }catch(err){
            next(err)
        }
    }
};

module.exports = productController;