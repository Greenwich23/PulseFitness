// Success.jsx - Simplified and fixed version
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { useCartContext } from "../Context/cartContext";
import "./success.css";
import { useEffect, useRef } from "react";
import StyledButton from "./Buttons";
import emailjs from "emailjs-com";

export default function Success() {
  const { cart, clearCart } = useCartContext();
  const { user, updateOrders } = useAuth();
  const orderProcessed = useRef(false);

  // ✅ SIMPLIFIED: Initialize EmailJS immediately and process order in ONE effect
  useEffect(() => {
    // Skip if already processed or no user
    if (orderProcessed.current || !user) return;

    // ✅ Initialize EmailJS FIRST (synchronous)
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    
    console.log("Initializing EmailJS with key:", publicKey?.substring(0, 10));
    
    if (!publicKey || !serviceId || !templateId) {
      console.error("Missing EmailJS environment variables");
      return;
    }

    try {
      emailjs.init(publicKey);
      console.log("✅ EmailJS initialized");
    } catch (error) {
      console.error("❌ EmailJS init failed:", error);
      return; // Don't proceed if initialization fails
    }

    // ✅ Process order only if cart has items
    if (cart.length > 0) {
      const cartItems = [...cart];
      
      // Calculate order details
      const orderSubtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
      );
      const orderShipping = orderSubtotal >= 150 ? 0 : 10;
      const orderTotal = orderSubtotal + orderShipping;

      // Create order object
      const newOrder = {
        id: "ORD" + Date.now(),
        items: cartItems,
        subtotal: orderSubtotal,
        shipping: orderShipping,
        total: orderTotal,
        date: new Date().toLocaleString(),
        status: "pending",
        deliveryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        deliveryDate2: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };

      console.log("Creating order:", newOrder.id);

      // ✅ Update orders in your context
      updateOrders(newOrder);

      // ✅ Send email (now EmailJS is definitely initialized)
      emailjs.send(
        serviceId,
        templateId,
        {
          order_id: newOrder.id,
          name: user.name || "Customer",
          email: user.email,
          orders: newOrder.items.map((item) => ({
            name: item.name,
            units: item.quantity,
            price: item.price.toFixed(2),
            image_url: item.image,
          })),
          cost: {
            shipping: orderShipping.toFixed(2),
            tax: "0.00",
            total: orderTotal.toFixed(2),
          },
        },
        publicKey
      )
      .then(() => {
        console.log("✅ Order email sent successfully");
      })
      .catch((err) => {
        console.error("❌ Failed to send order email:", err);
      });

      // ✅ Clear cart after a short delay
      setTimeout(() => {
        clearCart();
        console.log("Cart cleared");
      }, 100);

      // ✅ Mark as processed
      orderProcessed.current = true;
    } else {
      orderProcessed.current = true;
    }
  }, [user, cart, clearCart, updateOrders]); // Dependencies

  return (
    <div className="successPage">
      <h2>Thank You {user?.name || "Customer"} for shopping with us! 🎉</h2>
      <p>Your payment was successful.</p>
      <p>You can view your orders in your email or your profile.</p>
      <NavLink to="/profile" style={{ textDecoration: "none" }}>
        <StyledButton className="successBtn">Go to My Orders</StyledButton>
      </NavLink>
      <NavLink to="/women" style={{ textDecoration: "none" }}>
        <StyledButton className="continueShopBtn">Continue Shopping</StyledButton>
      </NavLink>
    </div>
  );
}