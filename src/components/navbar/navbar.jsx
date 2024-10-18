import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
const Navbar = ({menuClick,clickHandler}) => {
    return ( 
        <>
        <div className="w-full h-[100px] shadow-lg mb-8 lg:px-10 py-14  flex items-center justify-between">

          
            <div className="flex items-center justify-center" onClick={clickHandler}>
            <CiSearch  className="bg-[#e6c498]  m-2 p-2 rounded-full border-[3.5px] border-gray-600 hover:border-green-700 cursor-pointer text-[40px] lg:text-[50px]" />
            <span className="hidden lg:inline">جستجو ...</span>
            </div>

            <ul className="hidden lg:flex gap-10">
            <li className="">محصولات خانگی</li>
            <li className="">محصولات هورکا</li>
            
            </ul>

            <p className="text-2xl lg:text-3xl text-green-500 font-bold"><span>Mat</span><span className="text-amber-700">Coffee</span></p>

                <ul className="hidden lg:flex gap-10">
                <li className="">مجله بن‌مانو</li>
                <li className="">درباره ما</li>
                <li className="">تماس با ما</li>
                </ul>


            <IoMenu className="bg-[#e6c498] m-2 p-2 rounded-full border-2 border-gray-600 hover:border-green-700 cursor-pointer text-[40px] lg:text-[50px]" onClick={menuClick}  />


        </div>

        </>
     );
}
 
export default Navbar;