const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes.js');
const searchService = require('./services/searchService.js');

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use('/products', productRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('API ENDPOINTS ARE WORKING');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    searchService.readDataAndIndex(); // Index data when the server starts
});

