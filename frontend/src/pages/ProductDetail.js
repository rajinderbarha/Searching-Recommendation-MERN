// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';
// import ProductCard from '../components/ProductCard';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [product, setProduct] = useState(null);
//   const [recommendedProducts, setRecommendedProducts] = useState([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/products/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };
//     const fetchRecommendations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/products/recommendations/${id}`);
//         setRecommendedProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching recommendations:', error);
//       }
//     };

//     fetchProduct();
//     fetchRecommendations();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   const handleBackClick = () => {
//     navigate(-1); // Use the browser's history stack to go back to the previous page
//   };

//   return (
//     <div className="container mt-5">
//       <button onClick={handleBackClick} className="btn btn-secondary mb-3">Back to Results</button>
//       <div className="row">
//         <div className="col-md-6">
//           <Carousel>
//             {product.images_list.map((image, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   src={image}
//                   alt={`Product ${index + 1}`}
//                   className="d-block w-100"
//                   style={{ height: '400px', objectFit: 'contain' }}
//                 />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </div>
//         <div className="col-md-6">
//           <h1>{product.title}</h1>
//           <p>{product.product_details}</p>
//           <p><strong>Price:</strong> {product.price}</p>
//           <p><strong>Brand:</strong> {product.brand}</p>
//           <p><strong>Category:</strong> {product.breadcrumbs}</p>
//           <a href={product.url} target='_blank' rel="noreferrer" className="btn btn-primary">Buy Now</a>
//         </div>
//       </div>
//       <div className="mt-5">
//         <h3>Related Products</h3>
//         <div className="row">
//           {recommendedProducts.map(recommendedProduct => (
//             <div key={recommendedProduct._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
//               <ProductCard product={recommendedProduct} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/recommendations/${id}`);
        setRecommendedProducts(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchProduct();
    fetchRecommendations();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(-1); // Use the browser's history stack to go back to the previous page
  };

  return (
    <div className="container mt-5">
      <button onClick={handleBackClick} className="btn btn-secondary mb-3">Back to Results</button>
      <div className="row">
        <div className="col-md-6">
          <Carousel>
            {product.images_list && product.images_list.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="d-block w-100"
                  style={{ height: '400px', objectFit: 'contain' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p>{product.product_details}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.breadcrumbs}</p>
          {product.features && product.features.length > 0 && (
            <>
              <h5>Product Details:</h5>
              <ul>
                {product.features.map((featureArray, index) => (
                  <li key={index}>
                    {featureArray.map((feature, idx) => (
                      <p key={idx}><strong>{Object.keys(feature)[0]}:</strong> {Object.values(feature)[0]}</p>
                    ))}
                  </li>
                ))}
              </ul>
            </>
          )}
          <a href={product.url} target='_blank' rel="noreferrer" className="btn btn-primary">Buy Now</a>
        </div>
      </div>
      <div className="mt-5">
        <h3>Related Products</h3>
        <div className="row">
          {recommendedProducts.map(recommendedProduct => (
            <div key={recommendedProduct._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <ProductCard product={recommendedProduct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

