const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const productController = require('../controllers/product.controller');
const {addProductValidator} = require('../middleware/validations');
const formidable = require('express-formidable');

router.post('/',auth('createAny','product'),addProductValidator,productController.addProduct);

router.route('/product/:id')
.get(productController.getProductById)
.patch(auth('updateAny','product'),productController.updateProductById)
.delete(auth('deleteAny','product'),productController.deleteProductById);

router.get('/all', productController.allProducts);
router.post('/paginate/all', productController.paginateProducts)

router.post('/upload', auth('createAny','product'), formidable(), productController.uploadImage)

module.exports = router;