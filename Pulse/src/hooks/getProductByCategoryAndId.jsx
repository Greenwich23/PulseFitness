// utils.js
import { Products } from "../Data/products";

export function getProductByCategoryAndId(category, id) {
  console.log("Category: ", category)
  console.log("ID: ", id)
  const product = Products.find(
    (product) => product.category === category && product.id === id
  );
}
