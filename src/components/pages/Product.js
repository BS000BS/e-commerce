import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Product() {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const notify = useCallback(() => toast.success("Product was successfully added to cart!", {
    position: 'bottom-right'
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await axios.get('https://fakestoreapi.com/products/' + id);
          const productData = response.data;
          setProduct(productData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const capitalizeFirstLetter = useCallback((string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }, []);

  const increaseQty = useCallback(() => {
    setQty((qty) => qty + 1);
  }, []);

  const decreaseQty = useCallback(() => {
    setQty((qty) => qty - 1);
  }, []);

  const addToCart = useCallback((id, title, price, qty) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemInCart = cart.find(item => item.product_id === id);
    if (itemInCart) {
      itemInCart.product_qty += qty;
    } else {
      cart.push({
        product_id: id,
        product_title: title,
        product_price: price,
        product_qty: qty
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    notify();
  }, [notify]);

  return (
    <>
      {loading ? (
        <div style={{ minHeight: '80vh' }} className='d-flex flex-column justify-content-center align-items-center mt-5'>
          <div className="spinner-border text-secondary m-3" role="status">
            <span className="sr-only"></span>
          </div>
          <p> Loading products ...</p>
        </div>
      ) : (
        <div className='container' style={{ marginTop: '80px' }}>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center mb-5'>
              <img src={product.image} alt={product.title} style={{ width: '350px' }} />
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center flex-column gap-3 p-3'>
              <h3>{product.title}</h3>
              <p>{capitalizeFirstLetter(product.description)}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price} €</p>
              <div className='buttons d-flex gap-4'>
                {qty > 1 ? <button onClick={decreaseQty} type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-dash"></i></button> : <button disabled type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-dash"></i></button>}
                <div className='product-qty'><p className='m-0'>{qty}</p></div>
                <button onClick={increaseQty} type="button" className="btn btn-sm btn-outline-secondary"><i className="bi bi-plus-lg"></i></button>
              </div>
              <button onClick={() => addToCart(product.id, product.title, product.price, qty)} className='btn btn-outline-primary'>Add to cart</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default Product;
