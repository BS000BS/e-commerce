import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Product() {
  const [product, setProduct] = useState();
  const {id} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (id) {
      axios.get('https://fakestoreapi.com/products/'+id)
      .then(resp => {
        setProduct(resp.data)
        setLoading(false);
      })
    }
  }, [id]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      {loading ? 
            (<div style={{minHeight: '80vh'}} className='d-flex flex-column justify-content-center align-items-center mt-5'>
              <div className="spinner-border text-secondary m-3" role="status">
                <span className="sr-only"></span>
              </div>
              <p> Loading products ...</p>
            </div>) : 
              <div className='container' style={{marginTop: '80px'}}>
                <div className='row'>
                  <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mb-5'>
                    <img src={product.image} alt={product.title} style={{width: '350px'}} />
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center flex-column gap-3 p-3'>
                    <h3>{product.title}</h3>
                    <p>{capitalizeFirstLetter(product.description)}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: {product.price} €</p>
                  </div>
                </div>
              </div>
            }
    </>
  )
}

export default Product