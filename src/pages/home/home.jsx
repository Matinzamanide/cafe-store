import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CardItem from "../../components/card-item/card-item";
import SkeletonCard from "../../components/skelton/skelton";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import ReactPaginate from "react-paginate";
import FilterPanel from "../../components/filter-panel/filter-panel";
import Header from "./../../components/header/header";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.iransweb.com/products/coffee")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const filteredBySearch = products.filter((product) =>
      product.productName.includes(searchTerm)
    );

    if (selectedFilters.length > 0) {
      const filteredByCheckbox = filteredBySearch.filter((product) =>
        selectedFilters.some((filter) => product.productName.includes(filter))
      );
      setFilteredProducts(filteredByCheckbox);
    } else {
      setFilteredProducts(filteredBySearch);
    }
  }, [searchTerm, selectedFilters, products]);

  const checkboxHandler = (e) => {
    const { value, checked } = e.target;
    let updatedFilters;
    if (checked) {
      updatedFilters = [...selectedFilters, value];
    } else {
      updatedFilters = selectedFilters.filter((filter) => filter !== value);
    }
    setSelectedFilters(updatedFilters);
  };

  const handleRemoveFilters = () => {
    setSelectedFilters([]);
    setFilteredProducts(products);
  };

  const closeMenuHandler = () => {
    setMenu(false);
  };
  const openMenuHandler = () => {
    setMenu(true);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const inputRef = useRef();
  const focusHandler = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Sidebar
        closeHandler={closeMenuHandler}
        width={menu ? "w-[350px]" : "w-0"}
        lgWidth={menu ? "w-[10%]" : "w-0"}
      />
      <Navbar menuClick={openMenuHandler} clickHandler={focusHandler} />

      <Header />

      {menu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeMenuHandler}
        ></div>
      )}

      <div className="flex flex-col md:flex-row">
        <FilterPanel
          handleRemoveFilters={handleRemoveFilters}
          checkboxHandler={checkboxHandler}
        />

        <div className="mx-auto p-4 w-full md:w-[80%]">
          <input
            type="text"
            placeholder="جستجو برای محصولات..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" p-2 mb-4 w-[90%] mx-auto block border-2 border-green-700 placeholder:text-[#dfb072] rounded-md"
            ref={inputRef}
          />


          <p className="w-[90%] mx-auto my-6 text-green-600">{filteredProducts.length} نتیجه یافت شد </p>
          <div className="w-[90%] mx-auto flex flex-wrap">
            {!loading
              ? currentItems.map((product) => (
                  <CardItem key={product.id} {...product} />
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
          </div>


          {!loading && filteredProducts.length === 0 && (
            <p>هیچ محصولی مطابق جستجوی شما پیدا نشد.</p>
          )}

          <ReactPaginate
            breakLabel="..."
            nextLabel="بعدی >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< قبلی"
            containerClassName="flex justify-center mt-6 space-x-2"
            pageClassName="px-4 py-2 bg-white border rounded-md hover:bg-gray-200"
            previousClassName="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            nextClassName="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            activeClassName="bg-green-500 text-green-700 border-2 border-green-700"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
