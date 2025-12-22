import "./HomePage.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ProductCard from "../Components/ProductsCard";
import { useProducts } from "../hooks/useProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCartContext } from "../Context/cartContext";

export default function HomePage() {
  const { data: productsData } = useProducts();

  console.log(productsData);

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

  const handleProductClick = (productCategory, productId) => {
    navigate(`/${productCategory}/${productId}`);
  };

  const { addToCart } = useCartContext();

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
          <div className=" homeHeroButtonContainer">
            <NavLink className="homeHeroButton">
              Shop Collection
              <FaArrowRightLong className="homeHeroButtonIcon" />
            </NavLink>
            {/* <button className="border-2 border-[#E5E7EB] text-[#020617] px-8 py-4 hover:border-[#020617] transition-colors">
              Explore Lookbook
            </button> */}
          </div>
        </div>
        <div className="imageContainer">
          <img
            src="https://images.unsplash.com/photo-1760509370919-0a83b592e15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMGZhc2hpb24lMjBtb2RlbHxlbnwxfHx8fDE3NjUwODMwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Premium athletic wear"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div> */}
        </div>
      </div>
      <div className="featuredSection">
        <p className="featuredCollectionText">FEATURED COLLECTION</p>
        <div className="bestSellersDiv">
          <h2>Bestsellers</h2>
          {/* <NavLink>View All Products</NavLink> */}
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={15}
          slidesPerView={4}
          navigation
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          className="productsCardContainer"
        >
          {productsData?.slice(0, 8).map((product) => {
            return (
              <SwiperSlide key={product.id} className="swiperSlide">
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product.category, product.id)}
                  addtoCart={(e) => {
                    e.preventDefault(); // stop NavLink navigation
                    e.stopPropagation();
                    addToCart(product, product.colors[0], product.sizes[0], 1);
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="categorySection">
        <NavLink className="categoryDiv" to={"/women"}>
          <img
            src="https://images.unsplash.com/photo-1559278092-640149b5a287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY2xvdGhpbmclMjBwcm9kdWN0fGVufDF8fHx8MTc2NTE4NTUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            src="https://images.unsplash.com/photo-1602190420103-683df5093e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHNob3J0cyUyMG1lbnxlbnwxfHx8fDE3NjUxODU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
      <div className="ourStorySection">
        <div className="ourStoryDiv">
          <div className="ourStoryText">
            <h5>OUR STORY</h5>
            <h2>
              Built for Performance, <br /> Designed for Life
            </h2>
            <p>
              At Pulse, we believe that premium activewear should seamlessly
              transition from your workout to your everyday life. Every piece is
              thoughtfully designed with performance fabrics and timeless
              aesthetics.
            </p>
            <p>
              {" "}
              We're committed to sustainable practices, ethical manufacturing,
              and creating pieces that last beyond trends.
            </p>
            <NavLink className={"learnMoreBtn"} to={"/about"}>
              Learn More About Us
            </NavLink>
          </div>
          <div className="ourStoryCards">
            {ourStoryGoals.map((storygoals) => {
              return (
                <div className="ourStoryCard">
                  <h3 className="ourStoryCardTitle">{storygoals.title}</h3>
                  <p className="ourStoryCardDesc">{storygoals.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
