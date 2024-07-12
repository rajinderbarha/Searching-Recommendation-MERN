const natural = require('natural');
const Fuse = require('fuse.js');
const MongoClient = require('mongodb').MongoClient;
const Product = require('../models/ProductModel');
const synonyms = require('../utils/synonyms');

let products = [];
let fuse;

const preprocessText = (text) => {
    if (!text) return '';
    const tokenizer = new natural.WordTokenizer();
    let tokens = tokenizer.tokenize(text.toLowerCase());

    tokens = tokens.map(token => synonyms[token] || token);

    const stopWords = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'and', 'or'];
    tokens = tokens.filter(token => !stopWords.includes(token));

    const stemmer = natural.PorterStemmer;
    tokens = tokens.map(token => stemmer.stem(token));

    return tokens.join(' ');
};

const readDataAndIndex = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        console.log("Connected to MongoDB for Indexing");

        const db = client.db('ecommerce-searching');
        const collection = db.collection('products');
        const data = await collection.find({}).toArray();

        console.log(`Fetched ${data.length} products from MongoDB`);

        products = data.map(item => ({
            ...item,
            preprocessed_title: preprocessText(item.title),
            preprocessed_description: preprocessText(item.product_details),
            preprocessed_breadcrumbs: preprocessText(item.breadcrumbs)
        }));

        fuse = new Fuse(products, {
            keys: [
                { name: 'preprocessed_title', weight: 0.5 },
                { name: 'preprocessed_description', weight: 0.3 },
                { name: 'preprocessed_breadcrumbs', weight: 0.2 }
            ],
            threshold: 0.5,
            distance: 250
        });
        console.log('Products indexed for search');
    } catch (err) {
        console.error('Failed to read data from MongoDB:', err.message);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
        console.log('Search service is ready to use');
    }
};

const getFilteredProducts = async (search, currentPage, perPage) => {
    if (!fuse) {
        throw new Error('Products are still being indexed. Please try again later.');
    }

    // console.log(`Searching for: ${search}`);
    let filteredProducts = products;

    if (search) {
        const searchPreprocessed = preprocessText(search);
        const searchTokens = searchPreprocessed.split(' ');

        // console.log(`Preprocessed search query: ${searchPreprocessed}`);

        const exactMatches = products.filter(product =>
            searchTokens.every(token =>
                product.preprocessed_title.includes(token) ||
                product.preprocessed_description.includes(token) ||
                product.preprocessed_breadcrumbs.includes(token)
            )
        );

        const fuzzyResults = fuse.search(searchPreprocessed);
        const fuzzyMatches = fuzzyResults.map(result => result.item);

        const combinedResults = [...new Set([...exactMatches, ...fuzzyMatches])];

        filteredProducts = combinedResults.filter(product => {
            const productTokens = product.preprocessed_title.split(' ')
                .concat(product.preprocessed_description.split(' '))
                .concat(product.preprocessed_breadcrumbs.split(' '));
            return searchTokens.every(token => productTokens.includes(token));
        });

        // console.log(`Exact matches: ${exactMatches.length}`);
        // console.log(`Fuzzy matches: ${fuzzyMatches.length}`);
        // console.log(`Combined results: ${filteredProducts.length}`);
    }

    const startIndex = (currentPage - 1) * perPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + perPage);
    const totalPages = Math.ceil(filteredProducts.length / perPage);

    // console.log(`Returning ${paginatedProducts.length} products`);

    return {
        filteredProducts: paginatedProducts,
        totalPages: totalPages,
        currentPage: currentPage,  // Ensure currentPage is passed back correctly
        totalProducts: filteredProducts.length
    };
};

module.exports = {
    readDataAndIndex,
    getFilteredProducts
};
