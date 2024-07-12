const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  asin: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  product_details: {
    type: String,
    required: true
  },
  breadcrumbs: {
    type: String,
    required: true
  },
  images_list: {
    type: [String],
    required: true
  },
  features: {
    type: [Array],
    required: true
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;

