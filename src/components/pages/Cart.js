import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const EmptyCartIcon = styled.i`
  color: #FF5C5C;
  border: 1px solid #FF5C5C;

  &:hover {
    background-color: #FF5C5C;
    color: white;
  }
`;

const RemoveItem = styled.i`
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const IncreaseQty = styled.i`
  color: #949494;

  &:hover {
    color: black;
  }
`;

const DecreaseQty = styled.i`
  color: #949494;

  &:hover {
    color: black;
  }
`;


function Cart() {
  const navigate = useNavigate();
  const [initialCart, setInitialCart] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [qtyUpdated, setQtyUpdated] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
      setCart(cart)
      setInitialCart(cart)
    }
  }, []);

  useEffect(() => {
    // Calculate the total cost separately using reduce
    const total = cart.reduce((accumulator, item) => {
      return accumulator + item.product_price * item.product_qty;
    }, 0);
    setTotalPrice(total);
  }, [cart]); // Add 'cart' to the dependency array to recalculate when the cart changes

  function checkout() {
    if (localStorage.getItem('loggedIn') === null) {
      navigate('/login');
    }
  }

  const emptyCart = () => {
    localStorage.removeItem('cart');
    window.location.reload();
  }

  const removeCartItem = (id) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(item => item.product_id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }

  const increaseQty = (product_id) => {
    let newCart = JSON.parse(JSON.stringify(cart)); // stringifying and parsing just to not point to the same location in memory as cart, because then it modifies the initialCart as well
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id === product_id) {
        newCart[i].product_qty += 1;
        if (initialCart[i].product_qty !== newCart[i].product_qty) {
          setQtyUpdated(qty_updated => {
            return [...(qty_updated.filter(item => item !== product_id)), product_id];
          })
        } else {
          setQtyUpdated(qty_updated => {
            return [...(qty_updated.filter(item => item !== product_id))];
          })
        }
        break;
      }
    }
    setCart(newCart);
  }
  const decreaseQty = (product_id) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product_id === product_id) {
        newCart[i].product_qty -= 1;
        if (initialCart[i].product_qty !== newCart[i].product_qty) {
          setQtyUpdated(qty_updated => {
            return [...(qty_updated.filter(item => item !== product_id)), product_id];
          })
        } else {
          setQtyUpdated(qty_updated => {
            return [...(qty_updated.filter(item => item !== product_id))];
          })
        }
        break;
      }
    }
    setCart(newCart);
  }

  const saveQtys = (id, qty) => {
    let storage_cart = JSON.parse(localStorage.getItem('cart'));
    if (storage_cart !== null) {
      for (let i = 0; i < storage_cart.length; i++) {
        if (storage_cart[i].product_id === id && storage_cart[i].product_qty !== qty) {
          storage_cart[i].product_qty = qty;
          localStorage.setItem('cart', JSON.stringify(storage_cart));
          if (qtyUpdated.includes(id)) {
            setQtyUpdated(prev_state => {
              return prev_state.filter(item => item !== id);
            })
          }
          window.location.reload();
          return;
        }
      }
    }
  }


  return (
    <div>
      {cart.length > 0 ? (
        <div className='container mt-5'>
          <table className="table table-success table-striped-columns">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col" className='text-center'>Price</th>
                <th scope="col" className='text-center'>Quantity</th>
                <th scope="col" className='text-center'>Price * Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.product_title}</td>
                  <td className='text-center'>{item.product_price} €</td>
                  <td className='text-center'>
                    {item.product_qty > 1 ? <DecreaseQty onClick={() => decreaseQty(item.product_id)} title='Decrease quantity' className="me-2 bi bi-dash-circle"></DecreaseQty> : <div style={{ display: 'inline-block', width: '25px' }}></div>}
                    {item.product_qty}
                    <IncreaseQty onClick={() => increaseQty(item.product_id)} title='Increase quantity' className="ms-2 bi bi-plus-circle"></IncreaseQty> {qtyUpdated.includes(item.product_id) ? <i onClick={() => saveQtys(item.product_id, item.product_qty)} className="pt-2 bi bi-save" style={{ display: 'block' }} title='Save changes'></i> : ''}
                  </td>
                  <td className='text-center'>{Number.parseFloat(item.product_price * item.product_qty).toFixed(2)} €</td>
                  <td style={{ verticalAlign: 'middle' }}><RemoveItem onClick={() => removeCartItem(item.product_id)} title='Remove item from cart' className="bi bi-trash3 d-flex justify-content-center align-items-center p-2 rounded"></RemoveItem></td>
                </tr>
              ))}
              <tr>
                <th scope="row" colSpan={3} style={{ backgroundColor: 'white', border: '0' }}></th>
                <th style={{ borderWidth: '3px' }}>Total price:</th>
                <td style={{ borderWidth: '3px' }} className='text-center'>{Number.parseFloat(totalPrice).toFixed(2)} €</td>
              </tr>
            </tbody>
          </table>
          <div className='container d-flex justify-content-end me-5 mt-5'>
            <button type='submit' className='btn btn-outline-primary' onClick={() => checkout()} >Checkout</button>
            <EmptyCartIcon onClick={() => emptyCart()} title='Empty cart' className="bi bi-trash3 d-flex align-items-center ms-5 me-3 p-2 rounded"></EmptyCartIcon>
          </div>
        </div>
      ) : (
        <h3 className='text-center mt-5'>No product in the cart.</h3>
      )}
    </div>
  );
}

export default Cart;
