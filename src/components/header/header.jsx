import axios from "axios";
import { useEffect, useState } from "react";
import CardItem from "../card-item/card-item";

const Header = () => {
    const [data,setData]=useState([]);
    data.length=4;
    useEffect(()=>{
        axios.get('https://api.iransweb.com/products/coffee')
        .then((response)=>{
            setData(response.data);
        })
    },[])
    return ( 
        <>
            <p className="text-center w-48 mx-auto py-3 rounded-lg text-gray-200 text-lg bg-green-600 shadow-xl mt-16">پر فروش ترین ها</p>
        <div className="flex items-center justify-between">


        <div className="">
            <img src="https://www.bonmano.com/wp-content/uploads/2024/02/coffee-bean-main-page.jpg" alt="" />
        </div>


        <div className="mx-auto  flex-wrap hidden lg:flex">
            {
                
                data.map((item)=>{
                    return <CardItem {...item} />
                })
            }
        </div>

        </div>
        </>
     );
}
 
export default Header;