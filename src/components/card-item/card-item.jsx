import { CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
const CardItem = ({ id, productName, productImage, price }) => {
  return (
    <>
      <div className="w-full  md:w-1/2 lg:w-1/3 xl:w-1/4 p-3 ">
        <div className="border rounded-lg overflow-hidden hover:border-yellow-500 flex flex-col justify-between">
          <div className="top">
            <img src={productImage} className="w-full" alt="" />
          </div>
          <div className="bottom  px-8 pt-10 pb-4">
            <Link to={`/product/${id}`}>
              <p className="text-gray-700  hover:text-yellow-500 h-12">
                {productName}
              </p>
            </Link>
            <div className="flex items-center justify-between pt-14 ">
              <p>{price} تومان</p>
              <CiShop
                size={40}
                color="green"
                className="border border-green-600 rounded-2xl p-1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;