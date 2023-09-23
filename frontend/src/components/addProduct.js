import React from 'react'
import { useState } from 'react';
import{useNavigate} from "react-router-dom"
import ProductForm from "./productForm"
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { UserState } from '../context/userProvider';

export default function Addproduct() {
  const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        userId: "",
        brand: "",
        src: "",
        liked: "",
      }); 
      const{ user, setuser} = UserState();
      const [show, setShow] = useState(false);
      const handleClick = () => setShow(!show);
      const [picLoading, setPicLoading] = useState(false);


      const Navigate = useNavigate();
      const toast = useToast();
    
  
      const collectData = async () => {
        setPicLoading(true);
        if (!product.name || !product.price || !product.category || !product.src) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 2000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
          return;
        }
        // console.log(currentUser._id)
        // console.log(product.name, product.price, product.category, product.src);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios
          .post("/books/addBooks",{...product, userId:user._id},
            config
          );
          // console.log(data);
          toast({
            title: "book added to sell",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
          // localStorage.setItem("userInfo", JSON.stringify(data));
          setPicLoading(false);
         Navigate('/products/'+ user._id)
        } catch (error) {
          toast({
            title: "oops!",
            description: error.response.data.message,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
          setPicLoading(false);
        }
      };
 
  
  return (
    <div >
      
    
        <ProductForm 
        product={product}
        setProduct={setProduct}
        collectData={collectData}
        buttonText={"add product"}
        picLoading={picLoading}
        setPicLoading={setPicLoading}
        />
    </div>
  )
}
