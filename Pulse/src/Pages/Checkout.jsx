import { FaArrowRight, FaTrash } from "react-icons/fa";
import "./checkout.css";
import StyledButton from "../Components/Buttons";
import { useCartContext } from "../Context/cartContext";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import ProductCard from "../Components/ProductsCard";
import { useProducts } from "../hooks/useProducts";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Checkout() {
  const { cart, updateQuantity, removeFromCart } = useCartContext();

  const { addToCart } = useCartContext();

  //   const

  //   const totalPrice = cart?.map((item) => {
  //     totalPrice + item.price * item.quantity
  //   })

  console.log(cart);

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subTotal > 150 ? 0 : 10;
  const total = subTotal + shipping;
  const difference = 150 - subTotal;

  const { user } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current user:", user?.name);
    console.log("Cart items:", cart?.length);
    console.log("Cart contents:", cart);

    // Check localStorage directly
    if (user) {
      const cartKey = `cart_${user.id}`;
      const storedCart = localStorage.getItem(cartKey);
      console.log("Stored cart in localStorage:", storedCart);
    }
  }, [user, cart]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to continue");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    // Get the current URL safely
    const baseUrl =
      window.location.origin || "https://pulsewears.netlify.app";

    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        success_url: `${baseUrl}/success`,
        cancel_url: `${baseUrl}/checkout`,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("No URL returned from checkout:", data);
      toast.error("Checkout failed. Please try again.");
    }
  };

  const { data: productsData } = useProducts();
  const handleProductClick = (productCategory, productId) => {
    navigate(`/${productCategory}/${productId}`);
  };

  const cartCategories = cart.map((item) => item.category);
  const cartProductIds = cart.map((item) => item.id);

  const relatedProducts = productsData?.filter(
    (product) =>
      cartCategories.includes(product.category) &&
      !cartProductIds.includes(product.id)
  );

  return (
    <div className="checkOutPage">
      <h2 className="shoppingCartHeader">Shopping Cart</h2>
      {cart?.length == 0 ? (
        <div className="noItemsInCartDiv">
          <FaCartShopping className="cartShoppingIcon" />
          <h3>Your Cart is Empty</h3>
          <p>Looks like you haven't added anything to your cart yet</p>
          <NavLink className={"continueShoppingBtn"} to={"/women"}>
            Continue Shopping
          </NavLink>
        </div>
      ) : (
        <div>
          <div className="cartSection">
            <div className="orderProductsDiv">
              {cart?.map((productCards) => (
                <div className="orderCards">
                  <img src={productCards.image} alt="" />
                  <div className="orders">
                    <div className="orderTitleDiv">
                      <h3>{productCards.name}</h3>
                      <FaTrash
                        className="removeItemBtn"
                        onClick={() =>
                          removeFromCart(
                            productCards.id,
                            productCards.selectedColor,
                            productCards.selectedSize
                          )
                        }
                      />
                    </div>
                    <p className="orderProductColor">
                      Color : {productCards.selectedColor}
                    </p>
                    <p className="orderProductSize">
                      Size : {productCards.selectedSize}
                    </p>
                    <div className="orderProductQuantityContainer">
                      <div className="orderProductQuantityDiv">
                        <button
                          className="orderProductQuantityBtn"
                          onClick={() =>
                            updateQuantity(
                              productCards.id,
                              productCards.selectedColor,
                              productCards.selectedSize,
                              Math.max(1, productCards.quantity - 1)
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          className="productQuantityInput"
                          type="text"
                          value={productCards.quantity}
                          inputMode="numeric"
                          onChange={(e) => {
                            const value = e.target.value;

                            // Allow empty while typing
                            if (value === "") {
                              updateQuantity(
                                productCards.id,
                                productCards.selectedColor,
                                productCards.selectedSize,
                                1
                              );
                              return;
                            }

                            // Numbers only
                            if (/^[0-9]+$/.test(value)) {
                              updateQuantity(
                                productCards.id,
                                productCards.selectedColor,
                                productCards.selectedSize,
                                Number(value)
                              );
                            }
                          }}
                          onBlur={() => {
                            if (productCards.quantity < 1) {
                              updateQuantity(
                                productCards.id,
                                productCards.selectedColor,
                                productCards.selectedSize,
                                1
                              );
                            }
                          }}
                        />
                        <button
                          className="orderProductQuantityBtn"
                          onClick={() =>
                            updateQuantity(
                              productCards.id,
                              productCards.selectedColor,
                              productCards.selectedSize,
                              productCards.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <p className="orderProductPrice">
                          ${productCards.price * productCards.quantity}
                        </p>
                        <p>${productCards.price} for each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="orderSummaryDiv">
              <h3>Order Summary</h3>
              <div className="orderProductSummary">
                <p>SubTotal </p>
                <p className="orderProductSubTotalPrice">${subTotal}</p>
              </div>
              <div className="orderProductSummary">
                <p>Shipping </p>
                <p className="orderProductShippingPrice">${shipping}</p>
              </div>
              {difference > 0 && (
                <p className="freeShipping">
                  Add ${difference} more dollars for free shipping
                </p>
              )}

              <hr />
              <div className="orderProductTotalDiv">
                <p>Total</p>
                <p className="orderProductTotal">${total}</p>
              </div>
              <div className="checkOutBtnDiv">
                <button onClick={() => handleCheckout()}>
                  Proceed to Checkout
                </button>
                <FaArrowRight />
              </div>
              <NavLink className="continueShopBtn" to={"/women"}>
                Continue Shopping
              </NavLink>
              {/* <StyledButton>Proceed to Checkout</StyledButton> */}
              <hr />
              <div className="orderExtraInfoDiv">
                <li>Free shipping on orders over or exactly $150 </li>
                <li>Free returns within 30 days</li>
                <li>Secure checkout with SSL encryption</li>
              </div>
            </div>
          </div>
          <div className="ordersSimilarProductsSection">
            <h3>You May Also Like</h3>
            <div className="ordersSimilarProductsDiv">
              {relatedProducts?.slice(0, 4).map((product) => (
                <div className="ordersSimilarProducts">
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigatetoProduct={() =>
                      handleProductClick(product.category, product.id)
                    }
                    addtoCart={(e) => {
                      e.preventDefault(); // stop NavLink navigation
                      e.stopPropagation();
                      addToCart(
                        product,
                        product.colors[0],
                        product.sizes[0],
                        1
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* <hr /> */}
    </div>
  );
}
