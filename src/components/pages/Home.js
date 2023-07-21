import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../views/Footer';
import ProductCard from '../views/ProductCard';
import Carousel from '../views/Carousel';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products?limit=8')
      .then(resp => {
        setProducts(resp.data)
        setLoading(false);
      })
  }, []);

  return (
    <>
      <Carousel />
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

export default Home