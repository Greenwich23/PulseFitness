import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import NavBar from "./Components/NavBar.jsx";
import Footer from "./Components/Footer.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { CartProvider } from "./Context/cartContext.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Context/authContext.jsx";
// import {To}
// import ScrollToTop from "./Components/ScrollToTop.jsx";
// import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// const [visible, setVisible] = useState(false);

// useEffect(() => {
//   const toggleVisibility = () => {
//     if (window.scrollY > 200) {
//       setVisible(true);
//     } else {
//       setVisible(false);
//     }
//   };

//   window.addEventListener("scroll", toggleVisibility);
//   return () => window.removeEventListener("scroll", toggleVisibility);
// }, []);

// function ScrollToTopFunc() {
//   window.scrollTo(0, 0);
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <ScrollToTop />
            <NavBar />
            <App />
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
