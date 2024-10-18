import { FaRegTimesCircle } from "react-icons/fa";
import MatCoffee1 from '../../assets/img/MatCoffee1.webp';
const Sidebar = ({closeHandler,width,lgWidth}) => {
    return ( 
        <>
        <div className={`${width} lg:${lgWidth} overflow-hidden h-screen fixed bg-[#8d6648] rounded-e-3xl duration-500 z-20 shadow-lg shadow-gray-500  `}>
        <FaRegTimesCircle size={40} className="absolute left-4 top-4 cursor-pointer text-[#fdf5e6]"  onClick={closeHandler}/>
        <img src={MatCoffee1} className="w-full h-[20%] object-contain mx-auto " alt="" />
        <ul className="px-8 mt-16">
            <li className="bg-[#fdf5e6] rounded-lg 3 p-3  my-4 shadow-xl">محصولات خانگی</li>
            <li className="bg-[#fdf5e6] rounded-lg 3 p-3  my-4 shadow-xl">محصولات هورکا</li>
            <li className="bg-[#fdf5e6] rounded-lg 3 p-3  my-4 shadow-xl">مجله بن‌مانو</li>
            <li className="bg-[#fdf5e6] rounded-lg 3 p-3  my-4 shadow-xl">درباره ما</li>
            <li className="bg-[#fdf5e6] rounded-lg 3 p-3  my-4 shadow-xl">تماس با ما</li>
        </ul>
        </div>
        </>
     );
}
 
export default Sidebar;