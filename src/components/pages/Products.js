import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from '../views/ProductCard';
import Footer from '../views/Footer';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then(resp => {
        setProducts(resp.data)
        setLoading(false);
      })
  }, []);

  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          {loading ?
            (<div style={{ minHeight: '80vh' }} className='d-flex flex-column justify-content-center align-items-center mt-5'>
              <div className="spinner-border text-secondary m-3" role="status">
                <span className="sr-only"></span>
              </div>
              <p> Loading products ...</p>
            </div>) :
            products.map(product => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            }
            )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Products
