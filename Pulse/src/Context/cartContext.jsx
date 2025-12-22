import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../Context/authContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  // 🔑 Dynamic cart key
  const cartKey = user ? `cart_${user.id}` : "cart_guest";

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  });

  // 🔄 Reload cart when user logs in / out
  useEffect(() => {
    const stored = localStorage.getItem(cartKey);
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, [cartKey]);

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey]);

  // Add this at the top of your CartProvider
  // useEffect(() => {
  //   console.log("CartProvider - User changed:", user?.id);
  //   console.log(
  //     "CartProvider - Cart key will be:",
  //     user ? `cart_${user.id}` : "cart_guest"
  //   );
  // }, [user]);

  // And in the main useEffect that loads cart:
  // useEffect(() => {
  //   console.log("Loading cart for:", cartKey);
  //   console.log("Available in localStorage:", localStorage.getItem(cartKey));

  //   const stored = localStorage.getItem(cartKey);
  //   setCart(stored ? JSON.parse(stored) : []);
  // }, [cartKey]);

  useEffect(() => {
    console.log("Current user ID:", user?.id);
    console.log("Expected cart key:", user ? `cart_${user.id}` : "cart_guest");
    console.log("Actual cart items:", cart?.length);
  }, [user]);
  // ➕ ADD TO CART
  const addToCart = (product, color, size, quantity = 1) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingItem) {
        toast.success("Quantity updated 🛒");
        return prev.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast.success("Added to Cart 🛒");

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          category: product.category,
          selectedColor: color,
          selectedSize: size,
          quantity,
        },
      ];
    });
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id, color, size) => {
    toast.error("Removed from cart 🛒");
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  // 🔢 UPDATE QUANTITY
  const updateQuantity = (id, color, size, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.selectedColor === color &&
        item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);

    // remove guest cart
    localStorage.removeItem("cart_guest");

    // remove user cart
    if (user?.id) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
