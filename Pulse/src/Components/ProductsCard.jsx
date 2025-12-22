import { NavLink } from "react-router-dom";
import "./ProductsCard.css";

export default function ProductCard({ product, navigatetoProduct, addtoCart}) {
  const { name, price, images, category} = product;
  return (
    <div className="productCard" onClick={navigatetoProduct}>
      <div className="quickAddDiv">
        <img
          src={images[0]}
          alt=""
          className="productImage"
        />
        <button className="quickAddBtn" onClick={addtoCart}>Quick Add</button>
      </div>
      <p className="productCardCategory">{category}</p>
      <h2 className="productName">{name}</h2>
      <p className="productPrice">${price}</p>
    </div>
  );
}
