import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Cart({ cartItems, setCartItems }) {
  const [complete, setComplete] = useState(false);

  function increaseQty(item) {
    const updatedItems = cartItems.map((i) => {
      if (i.product._id === item.product._id) {
        return { ...i, qty: i.qty + 1 };
      }
      return i;
    });
    setCartItems(updatedItems);
  }

  function decreaseQty(item) {
    const updatedItems = cartItems.map((i) => {
      if (i.product._id === item.product._id && i.qty > 1) {
        return { ...i, qty: i.qty - 1 };
      }
      return i;
    });
    setCartItems(updatedItems);
  }

  function removeFromCart(item) {
    const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
    setCartItems(updatedItems);
  }

  function placeOrderHandler() {
    fetch(process.env.REACT_APP_API_URL + '/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems),
    }).then(() => {
      setCartItems([]);
      setComplete(true);
      toast.success("Order Success!");
    });
  }

  // Totals
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.product.price, 0);

  return (
    <div className="container container-fluid">
      {!complete && (
        <h2 className="mt-5">Your Cart: <b>{cartItems.length}</b></h2>
      )}

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItems.length > 0 && !complete ? (
            cartItems.map((item) => (
              <Fragment key={item.product._id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <Link to={"/product/" + item.product._id}>{item.product.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">₹{item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />
                        <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeFromCart(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))
          ) : complete ? (
            <Fragment>
              
              <h2 className="mt-5">Order Complete!</h2>
              <p>Your order has been placed Successfully.</p>
            </Fragment>
          ) : (
            <h2 className="mt-5">Your Cart is Empty!</h2>
          )}
        </div>

        {cartItems.length > 0 && !complete && (
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal: <span className="order-summary-values">{totalQty} Units</span></p>
              <p>Est. total: <span className="order-summary-values">₹{totalPrice}</span></p>
              <hr />
              <button
                id="checkout_btn"
                className="btn btn-primary btn-block"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
