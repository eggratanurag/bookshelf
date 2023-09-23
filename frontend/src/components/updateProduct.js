import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from "./productForm.js"
import axios from "axios";
import { Toast } from '@chakra-ui/react';
import { UserState } from '../context/userProvider.js';
export default function UpdateProducts() {
  const Navigate = useNavigate();
  const { user, setUser } = UserState();
  const [picLoading, setPicLoading] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState({
    name: "",
    price: "",
    category: "",
    brand: "",
    src: "",
});
 
  const params = useParams();

  useEffect(() => {
    getProduct();
    
  },[]);
  // console.log(updatingProduct)
async function getProduct () {
    try {
     await axios
        .get(`/books/updateBook/${params.id}`)
        .then((productsList) => setUpdatingProduct(productsList.data));
    } catch (error) {
     console.log(error)
    }

  }
 

  async function updateData () {

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios
      .put(`/books/updateBook/${updatingProduct._id}`,{...updatingProduct},
        config
      );
      console.log(data);
      Toast({
        title: "book added to sell",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      
     
     Navigate('/products/'+ user._id)
    } catch (error) {
     console.log(error)
   
    }
  
  }



  return (

      <ProductForm 
      product={updatingProduct} 
      setProduct = {setUpdatingProduct}
       collectData={updateData} 
       buttonText={"update product"}
       picLoading={picLoading}
       setPicLoading={setPicLoading}
       />
  
  )
}
