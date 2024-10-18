import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
    const productId=useParams().productId;
    console.log(productId);
    const [productData,setProductData]=useState([]);

    useEffect(()=>{
        axios.get(`https://api.iransweb.com/products/coffee/${productId}`)
        .then((response)=>{
            setProductData(response.data);
        })
    },[])

    return ( 
        <>
        <p></p>
        <img src={productData.productImage} alt="" />
        </>
     );
}
 
export default Product;
