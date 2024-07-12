const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getSingleProduct);
router.get('/recommendations/:productId', productController.getRecommendations);

module.exports = router;
