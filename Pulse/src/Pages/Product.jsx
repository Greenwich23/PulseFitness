import { NavLink, useParams, useNavigate } from "react-router-dom";
import { getProductByCategoryAndId } from "../hooks/getProductByCategoryAndId";
import Seperator from "../Components/Seperator";
import { IoIosArrowBack } from "react-icons/io";
import "./product.css";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../Components/ProductsCard";
import { useProducts, useSingleProduct } from "../hooks/useProducts";
import { useCartContext } from "../Context/cartContext";
import { Products } from "../Data/products";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useSingleProduct(category, id);

  console.log("Category: ", category);
  console.log("id: ", id);
  console.log("Product: ", product);

  // State for selected options
  const [colorPicked, setColorPicked] = useState("");
  const [sizesPicked, setSizesPicked] = useState("");
  const [imageShown, setImageShown] = useState("");
  const [activeTab, setActiveTab] = useState("Details");
  const [quantity, setQuantity] = useState(1);
  const [stockError, setStockError] = useState("");

  useEffect(() => {
    if (product) {
      setColorPicked(product.colors[0]);
      setSizesPicked(product.sizes[0]);
      setImageShown(product.images[0]);
    }
  }, [product]);

  const similarArray = useMemo(() => {
    if (!product) return null;

    return Products.filter(
      (item) =>
        item.subcategory === product.subcategory &&
        item.category === category &&
        item.id !== product.id
    );
  }, [product]);

  // Navigate to another product
  const handleProductClick = (productCategory, productId) => {
    navigate(`/${productCategory}/${productId}`);
  };

  const { addToCart } = useCartContext();

  // Handle quantity increase
  const handleIncrease = () => {
    if (!product || !product.qty) return;

    const newQuantity = quantity + 1;

    if (newQuantity < product.qty) {
      setQuantity(newQuantity);
      setStockError(""); // Clear error if valid
    } else {
      // Don't increase quantity, just show error
      // setStockError(`Only ${product.qty} items available`);
      // alert("Only 10 quantities left")
      toast.error(`Only ${product.qty} items available`)
      // console.log("Only 10 quantities left")
    }
  };

  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setStockError("");
    }
  };

  // Handle manual input
  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
      setStockError("");
      return;
    }

    if (/^[0-9]+$/.test(value)) {
      const numValue = parseInt(value);

      if (!product || !product.qty) {
        setQuantity(numValue);
        return;
      }

      if (numValue <= product.qty) {
        setQuantity(numValue);
        setStockError("");
      } else {
        setQuantity(product.qty);
        // setStockError(`Only ${product.qty} items available`);
        toast.error(`Only ${product.qty} items available`);
      }
    }
  };

  // Handle blur - fix invalid input
  const handleBlur = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1);
      // setStockError("");
    }
  };

  if (isLoading) {
    return (
      <div className="loadingIcon">
        <img src="/Images/loadingIcon.jpg" alt="image" />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  // Check if product is in stock
  const isOutOfStock = product.qty <= 0;

  return (
    <div className="singleProductPage">
      <div className="backToLinkDivSeperator">
        <div className="backToLinkDiv">
          <IoIosArrowBack className="productArrowBack" />
          <NavLink className="backToLink" to={`/${category.toLowerCase()}`}>
            Back to {category}
          </NavLink>
        </div>
      </div>

      <div className="productDetailsSection">
        <div className="productImagesDiv">
          <img src={imageShown} alt="" className="productMainImage" />
          <div className="productImagesGallery">
            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className={
                  imageShown === img
                    ? "productSmallerImage active"
                    : "productSmallerImage"
                }
                onClick={() => setImageShown(img)}
              />
            ))}
          </div>
        </div>

        <div className="singleProductDetailsDiv">
          <p className="singleProductCollection">{product?.collection}</p>
          <h2 className="singleProductName">{product?.name}</h2>
          <p className="singleProductPrice">${product?.price}</p>

          {/* Simple stock display */}
          <div className="stockDisplay">
            {isOutOfStock ? (
              <p className="outOfStock">Out of Stock</p>
            ) : product.qty <= 5 ? (
              <p className="lowStock">Only {product.qty} left!</p>
            ) : (
              <p className="inStock">In Stock</p>
            )}
          </div>

          <p className="singleProductDesc">{product?.description}</p>

          <p className="productColor">
            Color : <span className="productColorName">{colorPicked}</span>
          </p>

          <div className="productColorsDiv">
            {product?.colors?.map((color, index) => (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className={
                  colorPicked === color ? "colorCircle active" : "colorCircle"
                }
                onClick={() => setColorPicked(color)}
              />
            ))}
          </div>

          <div className="productSizeDiv">
            <div className="productSelectSizeDiv">
              <h4>Select Size</h4>
              <NavLink className="sizeGuide" to={"/sizeguide"}>
                Size Guide
              </NavLink>
            </div>
            <div className="productSizeCards">
              {product?.sizes?.map((size, index) => (
                <div
                  key={index}
                  className={
                    sizesPicked === size
                      ? "productSizes active"
                      : "productSizes"
                  }
                  onClick={() => setSizesPicked(size)}
                >
                  <p>{size}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="productQuantityContainer">
            <p>Quantity</p>
            <div className="productQuantityDiv">
              <button
                className="productQuantityBtn"
                onClick={handleDecrease}
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="productQuantityBtn">
                <input
                  className="productQuantityInput"
                  type="text"
                  value={quantity}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              <button
                className="productQuantityBtn"
                onClick={handleIncrease}
                disabled={quantity >= product.qty}
              >
                +
              </button>
            </div>

            {/* Stock error message */}
            {stockError && (
              <p className="stockErrorMessage" style={{ color: "red" }}>
                {stockError}
              </p>
            )}

            {/* Show available quantity */}
          </div>

          <button
            className={`addToCartBtn ${isOutOfStock ? "disabled" : ""}`}
            onClick={() => {
              if (!isOutOfStock) {
                addToCart(product, colorPicked, sizesPicked, quantity);
                // Simple alert for now
                // alert(`${quantity} × ${product.name} added to cart!`);
              }
            }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <hr />
          <div className="productDeliveriesDiv">
            <p> &bull; Free shipping on orders over $150</p>
            <p> &bull; Free returns within 30 days</p>
            <p> &bull; Ships within 1-2 business days</p>
          </div>

          <hr />
          <div className="productInfoTabs">
            {["Details", "Materials", "Care"].map((tab) => (
              <p
                key={tab}
                className={activeTab === tab ? "tab active" : "tab"}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </p>
            ))}
          </div>

          <div className="productExtraInfo">
            {activeTab === "Details" && (
              <ul>
                {product?.details?.map((detail, index) => (
                  <p key={index} className="productExtraInfoList">
                    {detail}
                  </p>
                ))}
              </ul>
            )}
            {activeTab === "Materials" && <p>{product.materials}</p>}
            {activeTab === "Care" && (
              <ul>
                {product?.careInstructions?.map((care, index) => (
                  <p key={index} className="productExtraInfoList">
                    {care}
                  </p>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="similarProductsSection">
        <div className="similarProductsDiv">
          <h3>You May Also Like</h3>
          <div className="similarProductsCardContainer">
            {similarArray?.slice(0, 4).map((item) => (
              <div key={item.id} className="similarProductCards">
                <ProductCard
                  product={item}
                  navigatetoProduct={() =>
                    handleProductClick(item.category, item.id)
                  }
                  addtoCart={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart(item, item.colors[0], item.sizes[0], 1);
                  }}
                />
              </div>
            ))}
            {similarArray?.length === 0 && (
              <p>There are no related products available at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
