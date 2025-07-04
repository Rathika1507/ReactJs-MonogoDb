import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState("1"); 
  const { id } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/product/" + id)
      .then((res) => res.json())
      .then((res) => setProduct(res.product))
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        toast.error("Failed to load product details");
      });
  }, [id]);

  function addToCart() {
    const quantity = parseInt(qty);

    if (!quantity || quantity < 1) {
      toast.warn("Quantity must be at least 1");
      return;
    }

    const itemExist = cartItems.find((item) => item.product._id === product._id);
    if (!itemExist) {
      const newItem = { product, qty: quantity };
      setCartItems((state) => [...state, newItem]);
      toast.success("Cart Item Added Successfully!");
    } else {
      toast.info("Item already in cart");
    }
  }

  function increaseQty() {
    const value = parseInt(qty) || 1;
    setQty(String(value + 1));
  }

  function decreaseQty() {
    const value = parseInt(qty) || 1;
    if (value > 1) {
      setQty(String(value - 1));
    }
  }

  function handleQtyChange(e) {
    const value = e.target.value;

    // Allow empty for typing
    if (value === "") {
      setQty("");
      return;
    }

    // Allow only numbers > 0
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setQty(value);
    }
  }

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img
            src={product.images?.[0]?.image || "/default-product.png"}
            height="500"
            width="500"
            alt={product.name}
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id}</p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>

          <hr />

          <p id="product_price">₹{product.price}</p>

          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={qty}
              onChange={handleQtyChange}
              min="1"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault(); 
                }
              }}
            />

            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </div>

          <button
            type="button"
            onClick={addToCart}
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status: <span id="stock_status">Pre Booking</span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>

          <hr />

          <p id="product_seller" className="mb-3">
            Sold by: <strong>{product.seller}</strong>
          </p>

          <div className="rating w-50"></div>
        </div>
      </div>
    </div>
  );
}

