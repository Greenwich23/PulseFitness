import { useState, useMemo } from "react";
import { FiFilter } from "react-icons/fi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import "./shop.css";
import ProductCard from "../Components/ProductsCard";
import { useProducts } from "../hooks/useProducts";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../Context/cartContext";

const categories = ["All Categories", "Backpacks", "Bottles", "Socks", "Caps"];
const collections = [
  "All Collections",
  "Core Collection",
  "Spring 2025",
  "Yoga Series",
];
const sortQueries = [
  "Name A-Z",
  "Featured",
  "Price : Low - High",
  "Price : High - Low",
];

export default function Accessories() {
  const [category, setSelectedCategory] = useState(() => {
    return "All Categories";
  });

  const [collection, setSelectedCollection] = useState(() => {
    return "All Collections";
  });

  const [sortedOption, setSortOption] = useState(() => {
    return "Name A-Z";
  });

  const [filteredSearch, setFilteredSearch] = useState(() => {
    return "";
  });

  const { data: productsData } = useProducts();

  const Accessories = productsData?.filter(
    (productCategory) => productCategory.category == "Accessories"
  );
  console.log(Accessories);

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedCollection("All Collections");
    setSortOption("Name A-Z");
    setFilteredSearch("");
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = Accessories || [];
    if (category && category !== "All Categories") {
      filtered = filtered.filter(
        (categoryFilter) => categoryFilter.subcategory === category
      );
      console.log("current category " + category);
    }
    if (collection && collection !== "All Collections") {
      filtered = filtered.filter(
        (collectionFilter) => collectionFilter.collection === collection
      );
      console.log("current collection" + collection);
    }

    if (filteredSearch && filteredSearch !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filteredSearch.toLowerCase())
      );
      console.log(filteredSearch);
    }

    if (sortedOption === "Featured") {
      filtered = [...filtered].filter(
        (featuredProduct) => featuredProduct.featured == true
      );
    } else if (sortedOption === "Name A-Z") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortedOption === "Price : Low - High") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortedOption === "Price : High - Low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [Accessories, category, sortedOption, filteredSearch, collection]);

  const navigate = useNavigate();

  const handleProductClick = (productCategory, productId) => {
    navigate(`/${productCategory}/${productId}`);
  };

  const { addToCart } = useCartContext();

  return (
    <div className="generalShop">
      <h3>Accessories</h3>
      <p className="generalShopDesc">
        Premium performance wear designed for the modern female athlete.
        Engineered for comfort, built for confidence
      </p>
      <div className="searchProducts" tabindex="0">
        <FaSearch />
        <input
          type="text"
          placeholder="Search for a Product..."
          className="searchInput"
          onChange={(e) => setFilteredSearch(e.target.value)}
          value={filteredSearch}
        />
      </div>
      <div className="filtersSection">
        {/* <hr /> */}
        <div className="filtersDiv">
          <div className="filtersDiv1">
            <p className="filterLogo">
              <FiFilter /> Filter :
            </p>
            <Menu as="div" className="filtersDropDownDiv">
              <MenuButton as="div" className="filtersMenuButton">
                <p>{category}</p>
                <IoIosArrowDown />
              </MenuButton>
              <MenuItems anchor="bottom" as="div" className="filtersDropDown">
                {categories.map((category) => (
                  <MenuItem
                    as="p"
                    key={category}
                    className="filterOptions"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
            <Menu as="div" className="filtersDropDownDiv">
              <MenuButton as="div" className="filtersMenuButton">
                <p>{collection}</p>
                <IoIosArrowDown />
              </MenuButton>

              <MenuItems anchor="bottom" as="div" className="filtersDropDown">
                {collections.map((collection) => (
                  <MenuItem
                    as="p"
                    key={collection}
                    className="filterOptions"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    {collection}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
          <div className="sortDiv">
            <p>Sort By : </p>
            <Menu as="div" className="filtersDropDownDiv">
              <MenuButton as="div" className="filtersMenuButton">
                <p>{sortedOption}</p>
                <IoIosArrowDown />
              </MenuButton>

              <MenuItems anchor="bottom" as="div" className="filtersDropDown">
                {sortQueries.map((sortOptions) => (
                  <MenuItem
                    as="p"
                    key={sortOptions}
                    className="filterOptions"
                    onClick={() => setSortOption(sortOptions)}
                  >
                    {sortOptions}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
        {/* <hr /> */}
      </div>
      <div className="productShopSection">
        <p className="showingProducts">Showing {filteredAndSortedProducts.length} products</p>
        {filteredAndSortedProducts?.length == 0 && (
          <div className="noProductsMatchDiv">
            <p>
              No products match your filters or search query, Try adjusting your
              filters
            </p>
            <p
              onClick={() => clearFilters()}
              style={{ textDecoration: "underline" }}
              className="clearFilters"
            >
              Clear your filters
            </p>
          </div>
        )}
        <div className="productsShopCards">
          {filteredAndSortedProducts?.map((product) => {
            return (
              <ProductCard
                product={product}
                navigatetoProduct={() =>
                  handleProductClick(product.category, product.id)
                }
                addtoCart={(e) => {
                  e.preventDefault(); // stop NavLink navigation
                  e.stopPropagation();
                  addToCart(product, product.colors[0], product.sizes[0], 1);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
