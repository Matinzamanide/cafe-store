import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // استفاده از axios برای درخواست HTTP
import CardItem from "../card-item/card-item";
import SkeletonCard from "../skelton/skelton";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import ReactPaginate from "react-paginate"; // اضافه کردن کتابخانه react-paginate
import FilterPanel from "../filter-panel/filter-panel";
import Header from "../header/header";

const ProductSearch = () => {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [menu, setMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // صفحه فعلی
  const itemsPerPage = 6; // تعداد آیتم‌ها در هر صفحه

  // دریافت داده‌ها از API
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.iransweb.com/products/coffee")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // در ابتدا همه محصولات را نمایش می‌دهیم.
        setLoading(false); // توقف حالت بارگذاری
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // فیلتر کردن محصولات بر اساس عبارت جستجو و چک‌باکس‌های انتخاب شده
  useEffect(() => {
    const filteredBySearch = products.filter(
      (product) => product.productName.includes(searchTerm) // جستجو بر اساس عبارت
    );

    // اگر فیلتر چک‌باکس وجود دارد، فقط محصولات مطابقت‌دار را نشان بده
    if (selectedFilters.length > 0) {
      const filteredByCheckbox = filteredBySearch.filter((product) =>
        selectedFilters.some((filter) => product.productName.includes(filter))
      );
      setFilteredProducts(filteredByCheckbox);
    } else {
      setFilteredProducts(filteredBySearch); // اگر هیچ فیلتر چک‌باکسی انتخاب نشده بود، نتایج جستجو را نشان بده
    }
  }, [searchTerm, selectedFilters, products]);

  // هندلر برای مدیریت تغییرات چک‌باکس‌ها
  const checkboxHandler = (e) => {
    const { value, checked } = e.target;
    let updatedFilters;
    if (checked) {
      updatedFilters = [...selectedFilters, value]; // اضافه کردن فیلتر به لیست
    } else {
      updatedFilters = selectedFilters.filter((filter) => filter !== value); // حذف فیلتر
    }
    setSelectedFilters(updatedFilters);
  };

  // تابع برای حذف فیلترها
  const handleRemoveFilters = () => {
    setSelectedFilters([]); // پاک کردن تمام فیلترها
    setFilteredProducts(products); // نمایش همه محصولات
  };

  const closeMenuHandler = () => {
    setMenu(false);
  };
  const openMenuHandler = () => {
    setMenu(true);
  };

  // صفحه‌بندی: محاسبه آیتم‌های نمایش داده شده بر اساس صفحه جاری
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // تغییر صفحه
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const inputRef=useRef();
  const focusHandler=()=>{
      inputRef.current.focus();
  }


  return (
    <>
    
      <Sidebar closeHandler={closeMenuHandler} width={menu ? "w-[350px]" : "w-0"} lgWidth={menu ? "w-[10%]" : "w-0"} />
      <Navbar
        menuClick={openMenuHandler}
        clickHandler={focusHandler}
      />
  <Header/>
      {/* Overlay برای وقتی که منو باز است */}
      {menu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeMenuHandler}
        ></div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* پنل فیلترها */}

      <FilterPanel handleRemoveFilters={handleRemoveFilters} checkboxHandler={checkboxHandler} />
      

        {/* بخش محصولات */}
        <div className="mx-auto p-4 w-full md:w-[80%]">
        <input
        type="text"
        placeholder="جستجو برای محصولات..."
        onChange={(e)=>setSearchTerm(e.target.value)}
        className=" p-2 mb-4 w-[90%] mx-auto block border-2 border-green-700 placeholder:text-[#dfb072] rounded-md"
        ref={inputRef}
      />
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

            {/* pagination کردن */}
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

export default ProductSearch;