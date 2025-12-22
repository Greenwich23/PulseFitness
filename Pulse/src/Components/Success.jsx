// Success.jsx - Fixed version with shipping fee
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useCartContext } from "../Context/cartContext";
import "./success.css";
import { useEffect, useRef } from "react";
import StyledButton from "./Buttons";
// import { EmailJSResponseStatus } from "emailjs-com";
import emailjs from "emailjs-com";

export default function Success() {
  const { cart, clearCart } = useCartContext();
  const { user, updateOrders } = useAuth();
  const navigate = useNavigate();

  const sendOrderEmail = (order) => {
    // const orderItemsText = order.items
    //   .map(
    //     (item) =>
    //       `${item.name} (${item.quantity}x) - $${item.price * item.quantity}`
    //   )
    //   .join("\n");

    emailjs
      .send(
       import.meta.env.VITE_EMAILJS_SERVICE_ID,
       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          order_id: order?.id,
          name: order?.name,
          email: user?.email,

          orders: order?.items?.map((item) => ({
            name: item.name,
            units: item.quantity,
            price: item.price.toFixed(2),
            image_url: item.image,
          })),

          cost: {
            shipping: order?.shipping.toFixed(2),
            tax: "0.00",
            total: order?.total.toFixed(2),
          },
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        console.log("Order email sent successfully");
      })
      .catch((err) => {
        console.error("Failed to send order email:", err);
      });
  };

  // Use ref to track if order was already created
  const orderProcessed = useRef(false);

  // Function to calculate shipping (same logic as Checkout page)
  const calculateShipping = (subtotal) => {
    return subtotal >= 150 ? 0 : 10;
  };

  useEffect(() => {
    // ✅ Skip if already processed or no user
    if (orderProcessed.current || !user) return;

    // ✅ Process order only if cart has items
    if (cart.length > 0) {
      // Create a copy of cart items BEFORE clearing
      const cartItems = [...cart];

      // Calculate subtotal (items total only)
      const orderSubtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Calculate shipping fee
      const orderShipping = calculateShipping(orderSubtotal);

      // Calculate total (subtotal + shipping)
      const orderTotal = orderSubtotal + orderShipping;

      const getDeliveryDate = (daysToAdd = 10) => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + daysToAdd);
        return deliveryDate;
      };

      const getDeliveryDate2 = (daysToAdd = 12) => {
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + daysToAdd);
        return deliveryDate;
      };

      // ✅ Create order with shipping details
      const newOrder = {
        id: "ORD" + Date.now(),
        items: cartItems,
        subtotal: orderSubtotal,
        shipping: orderShipping,
        total: orderTotal,
        date: new Date().toLocaleString(),
        status: "pending",
        deliveryDate: getDeliveryDate().toLocaleDateString(),
        deliveryDate2: getDeliveryDate2().toLocaleDateString(),
        shippingThreshold: 150, // Optional: store the threshold for reference
        shippingEligible: orderSubtotal >= 150, // Optional: for quick reference
      };

      console.log("Creating order:", {
        items: cartItems.length,
        subtotal: orderSubtotal,
        shipping: orderShipping,
        total: orderTotal,
      });

      // ✅ Update orders first
      updateOrders(newOrder);
      sendOrderEmail(newOrder);

      // ✅ Then clear the cart
      setTimeout(() => {
        clearCart();
        console.log("Cart cleared after order creation");
      }, 100);

      // ✅ Mark as processed
      orderProcessed.current = true;
    } else {
      // If cart is already empty, just mark as processed
      orderProcessed.current = true;
    }
  }, [user, cart, clearCart, updateOrders]);

  return (
    <div className="successPage">
      <h2>Thank You {user?.name || "Customer"} for shopping with us! 🎉</h2>
      <p>Your payment was successful.</p>
      <p>You can view your orders in your email or your profile.</p>
      <NavLink to="/profile" style={{ textDecoration: "none" }}>
        <StyledButton className="successBtn">Go to My Orders</StyledButton>
      </NavLink>
      <NavLink to="/women" style={{ textDecoration: "none" }}>
        <StyledButton className="continueShopBtn">
          Continue Shopping
        </StyledButton>
      </NavLink>
    </div>
  );
}
