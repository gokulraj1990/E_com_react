import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css'; // Import the CSS file

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/product/get/');
        setProducts(response.data.Products);
      } catch (err) {
        setMessage('Error fetching products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/product/get/?q=${searchQuery}`);
      setProducts(response.data.Products);
      if (response.data.Products.length === 0) {
        setMessage('No products found.');
      } else {
        setMessage('');
      }
    } catch (err) {
      setMessage('Error searching products.');
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container">
      <h2>Products</h2>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products"
        />
        <button type="submit">Search</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="product-list">
        {products.map(product => (
          <div className="product-card" key={product.productID}>
            <img src={product.imageUrl} alt={product.model} />
            <h3>{product.product}</h3>
            <p>{product.model}</p>
            <p>{product.description}</p>
            <p className="price">Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
