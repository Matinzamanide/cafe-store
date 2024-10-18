import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "../card-item/card-item";

const CheckBox = () => {
  const [list, setList] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    axios.get('https://api.iransweb.com/products/coffee')
      .then((response) => {
        setList(response.data);
        setFilteredItems(response.data); // تنظیم filteredItems با داده‌های API
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const checkboxHandler = (e) => {
    const { value, checked } = e.target;

    let updatedFilters;
    if (checked) {
      // اضافه کردن فیلتر به لیست فیلترهای انتخاب شده
      updatedFilters = [...selectedFilters, value];
    } else {
      // حذف فیلتر از لیست فیلترهای انتخاب شده
      updatedFilters = selectedFilters.filter((filter) => filter !== value);
    }

    setSelectedFilters(updatedFilters);

    // اگر هیچ فیلتری انتخاب نشده باشد، همه آیتم‌ها را نمایش دهیم
    if (updatedFilters.length === 0) {
      setFilteredItems(list);
    } else {
      // فیلتر کردن آیتم‌ها بر اساس فیلترهای انتخاب شده
      setFilteredItems(
        list.filter((item) =>
          updatedFilters.some((filter) => item.productName.includes(filter))
        )
      );
    }
  };

  return (
    <>
      <div className="mx-auto w-[80%]">
        <div className="mt-16">
          <label htmlFor="">بن مانو</label>
          <input
            type="checkbox"
            value="بن مانو"
            onChange={checkboxHandler}
            name=""
            id=""
          />
          <br />
          <label htmlFor="">شاران</label>
          <input
            type="checkbox"
            value="شاران"
            onChange={checkboxHandler}
            name=""
            id=""
          />
        </div>

        <div className="w-[90%] mx-auto flex flex-wrap">
          {filteredItems.map((item) => (
            <CardItem {...item} />
          ))}
        </div>
      </div>

      {filteredItems.length}
    </>
  );
};

export default CheckBox;