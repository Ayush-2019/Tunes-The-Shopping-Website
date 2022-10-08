const express = require('express');
const brandController = require('../controllers/brand.controller');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/brand', auth('createAny', 'brand'), brandController.addBrand);
router.route('/brand/:id')
.get(brandController.getBrand)
.delete(auth('deleteAny','brand'), brandController.deleteBrand);

router.get('/all', brandController.getAllBrands);

module.exports = router;