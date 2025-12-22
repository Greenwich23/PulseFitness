import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // At the beginning of your AuthProvider component
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (!storedUser) return null;

    const parsedUser = JSON.parse(storedUser);

    // ✅ Ensure orders are properly loaded from the main users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFromDb = users.find((u) => u.id === parsedUser.id);

    // Merge orders from database if available
    if (userFromDb?.orders) {
      return { ...parsedUser, orders: userFromDb.orders };
    }

    return parsedUser;
  });

  const [loading, setLoading] = useState(true);

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Restore session on refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("auth_user"));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // ⚠️ MOCK LOGIN (replace with API later)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("auth_user", JSON.stringify(existingUser));
    setUser(existingUser);
    mergeGuestCart(existingUser.id);
  };

  const signup = (name, email, password, phoneNumber, memberSince) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: generateUUID(),
      name,
      email,
      password,
      phoneNumber,
      memberSince // ⚠️ plain text ONLY for now
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("auth_user", JSON.stringify(newUser));

    setUser(newUser);
    mergeGuestCart(newUser.id);
  };

  const logout = () => {
    // Save any pending changes before logout
    if (user) {
      // Update the main users array with current user data
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === user.id ? { ...u, orders: user.orders || [] } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    // Clear session
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const mergeGuestCart = (userId) => {
    const guestCart = JSON.parse(localStorage.getItem("cart_guest")) || [];
    if (!guestCart.length) return;

    const userCartKey = `cart_${userId}`;
    const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    const mergedCart = [...userCart];

    guestCart.forEach((guestItem) => {
      const existing = mergedCart.find(
        (item) =>
          item.id === guestItem.id &&
          item.selectedColor === guestItem.selectedColor &&
          item.selectedSize === guestItem.selectedSize
      );

      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        mergedCart.push(guestItem);
      }
    });

    localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
    localStorage.removeItem("cart_guest");
  };

  const updatePassword = (currentPassword, newPassword) => {
    if (!user) throw new Error("Not authenticated");

    // 1️⃣ Check current password
    if (user.password !== currentPassword) {
      throw new Error("Current password is incorrect");
    }

    // 2️⃣ Update users array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 3️⃣ Update auth_user
    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));

    // 4️⃣ Update state
    setUser(updatedUser);
  };

  const updateProfile = (updates) => {
    if (!user) throw new Error("Not authenticated");

    // 1️⃣ Update the users array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, ...updates } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 2️⃣ Update auth_user in localStorage
    const updatedUser = { ...user, ...updates };
    localStorage.setItem("auth_user", JSON.stringify(updatedUser));

    // 3️⃣ Update React state
    setUser(updatedUser);
  };

  // In your AuthContext.jsx
  const updateOrders = (newOrder) => {
    setUser((prev) => {
      const updatedOrders = prev.orders
        ? [...prev.orders, newOrder]
        : [newOrder];
      const updatedUser = { ...prev, orders: updatedOrders };

      // ✅ FIX 1: Update auth_user (current session)
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));

      // ✅ FIX 2: Update the main users array in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.id === prev.id ? { ...u, orders: updatedOrders } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return updatedUser;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    mergeGuestCart,
    updatePassword,
    updateProfile,
    updateOrders,
  };

  if (loading) return null; // prevents flicker

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
