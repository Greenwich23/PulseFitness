import { useQuery } from "@tanstack/react-query";
import { Products } from "../Data/products";

// import { useState } from "react";
async function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Products);
    }, 300);
  });
}

async function fetchSingleProduct(category, id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = Products.find(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() &&
          p.id === Number(id)
      );

      resolve(product || null);
    }, 300);
  });
}

export const useProducts = () => {
  // setstate(true)
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useSingleProduct = (category, id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchSingleProduct(category, id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
