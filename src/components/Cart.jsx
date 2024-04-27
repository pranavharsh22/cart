import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import shop from "../images/pngwing.com.png";
import { FaBed } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "../features/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  const handledecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleincreaseCart = (cartItem) => {
    dispatch(increaseCart(cartItem));
  };
  const handleclearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <img src={shop} alt="" />
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              <span>Start Buying Properties </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Properties</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <div className="cart-product-card">
                  <img src={cartItem.image} alt="" />
                  <div className="flat-details">
                    <h3>Location: {cartItem.name}</h3>
                    <p  className="flat-description">{cartItem.desc}</p>
                    <p className="flat-beds">{cartItem.beds}&nbsp;<FaBed/></p>
                    <p className="flat-star">{cartItem.rating}&nbsp;<FaStar style={{color:'yellow'}}/> Ratings</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handledecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleincreaseCart(cartItem)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleclearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calcuated at checkout</p>
              <button onClick={()=>navigate('/details', {
                state: {cart}
              })}>Checkout</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
