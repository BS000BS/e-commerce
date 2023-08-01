import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductCard from '../views/ProductCard';
import Footer from '../views/Footer';
import Filter from '../views/Filter';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayTheseProducts, setDisplayTheseProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState('');

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(resp => {
        setProducts(resp.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter products based on the filterProducts state
    if (filterProducts.trim() !== '') {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(filterProducts.toLowerCase())
      );
      setDisplayTheseProducts(filteredProducts);
    } else {
      //if filterProducts is an empty string, which means the user didn't search for something, then the products which are displayed are the products received from the api
      setDisplayTheseProducts(products);
    }
  }, [filterProducts, products]);

  const filter = (searchTerm) => {
    //if the user submits some type of string to search for it, this function will be triggered, which then triggers the useEffect above, because the filterProducts value/state has been changed
    setFilterProducts(searchTerm);
  };

  return (
    <>
      <Filter filter={filter} />
      <div className='container my-5'>
        <div className='row'>
          {loading ? (
            <div style={{ minHeight: '80vh' }} className='d-flex flex-column justify-content-center align-items-center mt-5'>
              <div className="spinner-border text-secondary m-3" role="status">
                <span className="sr-only"></span>
              </div>
              <p> Loading products ...</p>
            </div>
          ) : (
            displayTheseProducts.length > 0 ? (
              displayTheseProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div style={{ minHeight: '80vh' }} >
                <h4 className='text-center mt-5'>No products found.</h4>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
