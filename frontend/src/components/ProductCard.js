import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    // Prevent navigation if the click comes from the carousel controls
    if (event.target.classList.contains('carousel-control-prev-icon') || event.target.classList.contains('carousel-control-next-icon')) {
      return;
    }
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {product.images_list && product.images_list.length > 0 && (
        <Carousel>
          {product.images_list.map((image, index) => (
            <Carousel.Item key={index}>
              <img src={image} alt={`${product.title} - ${index}`} className="d-block w-100" style={{ height: '400px', objectFit: 'contain' }} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p>Brand : {product.brand}</p>
        <p className="card-text">
          {typeof product.product_details === 'string' ? product.product_details : JSON.stringify(product.product_details)}
        </p>
        <p className="card-text">Price : <small className="text-muted">{product.price}</small></p>
      </div>
    </div>
  );
};

export default ProductCard;
