import CheckboxInput from "../checkbox-input/checkbox-input";

const FilterPanel = ({ checkboxHandler, handleRemoveFilters }) => {
  return (
    <>
      <div className="w-full md:w-[20%] p-6 bg-white shadow-lg rounded-lg mb-6 md:mb-0">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full md:w-auto text-lg font-semibold mb-4 hover:bg-green-600 transition duration-300">
          فیلتر بر اساس برند
        </button>
        <div className="mt-4 space-y-4">
          <CheckboxInput value="شاران" changeHandler={checkboxHandler} />
          <CheckboxInput value="فرمند" changeHandler={checkboxHandler} />
        </div>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg w-full md:w-auto text-lg font-semibold mt-6 hover:bg-green-600 transition duration-300">
          فیلتر بر اساس وزن
        </button>
        <div className="mt-4 space-y-4">
          <CheckboxInput value="250 گرم" changeHandler={checkboxHandler} />
          <CheckboxInput value="100 گرم" changeHandler={checkboxHandler} />
          <CheckboxInput value="700 گرم" changeHandler={checkboxHandler} />
        </div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg w-full md:w-auto text-lg font-semibold mt-8 hover:bg-red-600 transition duration-300"
          onClick={handleRemoveFilters} 
        >
          حذف فیلتر
        </button>
      </div>
    </>
  );
};

export default FilterPanel;
