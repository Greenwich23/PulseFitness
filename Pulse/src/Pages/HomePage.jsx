import "./HomePage.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ProductCard from "../Components/ProductsCard";
import { useProducts } from "../hooks/useProducts";
import { useCartContext } from "../Context/cartContext";
import { useNavigate } from "react-router-dom";

/* ✅ ADDED */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

/* ✅ ADDED */
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export default function HomePage() {
  const { data: productsData } = useProducts();

  const navigate = useNavigate();
  const { addToCart } = useCartContext();

  const handleProductClick = (productCategory, productId) => {
    navigate(`/${productCategory}/${productId}`);
  };

  const ourStoryGoals = [
    {
      title: "Premium Fabrics",
      description:
        "Moisture-wicking, breathable materials engineered for peak performance.",
    },
    {
      title: "Sustainable",
      description:
        "Eco-conscious production with recycled materials and ethical practices.",
    },
    {
      title: "Perfect Fit",
      description:
        "Engineered cuts designed to move with your body, not against it.",
    },
    {
      title: "Lifetime Quality",
      description:
        "Built to last with reinforced stitching and durable construction.",
    },
  ];

  return (
    <div className="homepage">
      <div className="heroSection">
        <div className="heroFirstSection">
          <p className="heroHeaderText">Spring 2025 Collection</p>
          <p className="confidence">
            Move with <br /> Confidence
          </p>
          <div className="homeHeroDescription">
            Premium performance wear designed for the modern athlete. Where
            function meets fashion.
          </div>
          <div className="homeHeroButtonContainer">
            <NavLink className="homeHeroButton" to={"/women"}>
              Shop Collection
              <FaArrowRightLong className="homeHeroButtonIcon" />
            </NavLink>
          </div>
        </div>

        <div className="imageContainer">
          <img
            src="https://images.unsplash.com/photo-1760509370919-0a83b592e15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Premium athletic wear"
          />
        </div>
      </div>

      {/* ================= FEATURED SECTION ================= */}
      <div className="featuredSection">
        <p className="featuredCollectionText">FEATURED COLLECTION</p>

        <div className="bestSellersDiv">
          <h2>Bestsellers</h2>
        </div>

        {/* ✅ REPLACED EMBLA WITH REACT MULTI CAROUSEL */}
        {productsData && productsData.length > 0 && (
          <Carousel
            responsive={responsive}
            autoPlay /* ✅ Enable autoplay */
            autoPlaySpeed={3500}
            infinite
            arrows={true}
            showDots={true}
            keyBoardControl
            containerClass="product-carousel"
            itemClass="product-carousel-item"
          >
            {productsData.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                navigatetoProduct={() =>
                  handleProductClick(product.category, product.id)
                }
                addtoCart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product, product.colors[0], product.sizes[0], 1);
                }}
              />
            ))}
          </Carousel>
        )}
      </div>

      {/* ================= CATEGORY SECTION ================= */}
      <div className="categorySection">
        <NavLink className="categoryDiv" to={"/women"}>
          <img
            src="https://images.unsplash.com/photo-1559278092-640149b5a287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt=""
            className="categorySectionImage"
          />
          <div className="categorySectionText">
            <p>SHOP</p>
            <h3>Women's Collection</h3>
            <NavLink className={"exploreNowBtn"} to={"/women"}>
              Explore Now
            </NavLink>
          </div>
        </NavLink>

        <NavLink className="categoryDiv" to={"/men"}>
          <img
            src="https://images.unsplash.com/photo-1602190420103-683df5093e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt=""
            className="categorySectionImage"
          />
          <div className="categorySectionText">
            <p>SHOP</p>
            <h3>Men's Collection</h3>
            <NavLink className={"exploreNowBtn"} to={"/men"}>
              Explore Now
            </NavLink>
          </div>
        </NavLink>
      </div>

      {/* ================= OUR STORY ================= */}
      <div className="ourStorySection">
        <div className="ourStoryDiv">
          <div className="ourStoryText">
            <h5>OUR STORY</h5>
            <h2>
              Built for Performance, <br /> Designed for Life
            </h2>
            <p>
              At Pulse, we believe that premium activewear should seamlessly
              transition from your workout to your everyday life.
            </p>
            <p>
              We're committed to sustainable practices, ethical manufacturing,
              and creating pieces that last beyond trends.
            </p>
            <NavLink className={"learnMoreBtn"} to={"/about"}>
              Learn More About Us
            </NavLink>
          </div>

          <div className="ourStoryCards">
            {ourStoryGoals.map((storygoals) => (
              <div className="ourStoryCard" key={storygoals.title}>
                <h3 className="ourStoryCardTitle">{storygoals.title}</h3>
                <p className="ourStoryCardDesc">{storygoals.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
