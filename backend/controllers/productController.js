const Product = require('../models/productModel.js');
const searchService = require('../services/searchService.js');

exports.getAllProducts = async (req, res) => {
    const { search = '', page = 1, limit = 50 } = req.query;
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);

    try {
        const { filteredProducts, totalPages, currentPage: returnedPage, totalProducts } = await searchService.getFilteredProducts(search, currentPage, perPage);
        res.json({
            products: filteredProducts,
            totalPages: totalPages,
            currentPage: returnedPage,
            totalProducts: totalProducts
        });
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Fetch and log a single product
exports.getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("Attempting to fetch a single product...");
        const product = await Product.findById(productId); // Fetch a single product by ID
        if (!product) {
            res.status(404).json({ message: 'No product found' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        console.error('Error fetching product:', err.message);
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};
exports.getRecommendations = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).exec();

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const recommendedProducts = await Product.find({
            breadcrumbs: product.breadcrumbs,
            _id: { $ne: productId }
        }).limit(8).exec();

        res.status(200).json(recommendedProducts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching recommendations', error: err.message });
    }
};

// exports.getRecommendations = async (req, res) => {
//     try {
//         const { productId } = req.params;
//         const product = await Product.findById(productId).exec();

//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }

//         // Extract gender information from breadcrumbs
//         const genderCategory = product.breadcrumbs.toLowerCase().includes('women') ? 'women' : 
//                                product.breadcrumbs.toLowerCase().includes('men') ? 'men' : null;

//         if (!genderCategory) {
//             return res.status(400).json({ message: 'Unable to determine gender category from breadcrumbs' });
//         }

//         const recommendedProducts = await Product.find({
//             breadcrumbs: new RegExp(genderCategory, 'i'),
//             _id: { $ne: productId }
//         }).limit(10).exec();

//         res.status(200).json(recommendedProducts);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching recommendations', error: err.message });
//     }
// };





























// // Fetch all products with pagination and search
// exports.getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 40, search = '' } = req.query;

//     const query = search ? { title: { $regex: search, $options: 'i' } } : {};

//     const products = await Product.find(query)
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await Product.countDocuments(query);

//     res.status(200).json({
//       products,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const Product = require('../models/productModel');

// Fetch and log a single product
// exports.getSingleProduct = async (req, res) => {
//   try {
//     console.log("Attempting to fetch a single product...");
//     const product = await Product.findOne(); // Fetch a single product
//     console.log("Fetched product:", product); // Log the product to the console
//     if (!product) {
//       res.status(404).json({ message: 'No product found' });
//     } else {
//       res.status(200).json(product);
//     }  
//   } catch (err) {
//     console.error('Error fetching product:', err);
//     res.status(500).json({ message: err.message });
//   }  
// };  

// exports.getProducts = async (req, res) => {
//   try {
//     console.log("Attempting to fetch up to 50 products...");
//     const products = await Product.find().limit(50); // Fetch up to 50 products
//     console.log("Fetched products:", products); // Log the products to the console
//     if (products.length === 0) {
//       res.status(404).json({ message: 'No products found' });
//     } else {
//       res.status(200).json(products);
//     }
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ message: err.message });
//   }
// };