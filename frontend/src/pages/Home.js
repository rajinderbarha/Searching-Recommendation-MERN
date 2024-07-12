import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard.js';
import { SearchContext } from '../context/SearchContext.js';

const Home = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // useRef to store component state
  const stateRef = useRef({
    searchQuery,
    currentPage,
    products,
    totalPages
  });

  useEffect(() => {
    if (location.state) {
      const { searchQuery, currentPage } = location.state;
      setSearchQuery(searchQuery);
      setCurrentPage(currentPage);
      stateRef.current.searchQuery = searchQuery;
      stateRef.current.currentPage = currentPage;
    }
  }, [location.state, setSearchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://searching-recommendation-mern.onrender.com/products', {
          params: { page: currentPage, limit: 40, search: searchQuery }
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        stateRef.current.products = response.data.products;
        stateRef.current.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      stateRef.current.currentPage = currentPage + 1;
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      stateRef.current.currentPage = currentPage - 1;
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`, { state: { searchQuery: stateRef.current.searchQuery, currentPage: stateRef.current.currentPage } });
  };

  return (
    <div className="container mt-5">
      <div className="row" style={{ minHeight: '70vh' }}>
        {products.map(product => (
          <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard product={product} onClick={() => handleProductClick(product._id)} />
          </div>
        ))}
      </div>
      <div className="pagination d-flex justify-content-center align-items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="btn btn-primary mx-2"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="btn btn-primary mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
