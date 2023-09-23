import { useParams } from 'react-router-dom';
import React ,{useState,useEffect}from 'react'
import Profile from "./profile.js"
import axios from 'axios';
export default function SellerProfile() {
const [seller, setSeller] = useState()
const [loading, setLoading] = useState(true);
const [resultAvailable, setResultAvailable] = useState(true);
const [products, setProducts] = useState([]);
  const params = useParams();
  //  console.log(params)
   
   useEffect(() => {
  
      products.length ===0
          ? setResultAvailable(false)
          : setResultAvailable(true)
    
    setLoading(false);
  }, [products]);

 useEffect(() => {
  setLoading(true)
   getUser();
   getProducts();
    
  },[]);
async function getUser () {
    
  try {
        const config = {
            headers: {
                "Content-type": "application/json",
               
            },
          };
          await axios
        .get(`/api/user/seller/${params.id}`, config)
        // .then(user=> console.log(user.data))
        .then(user => setSeller(user.data));
    
    } catch (error) {
     console.log(error)
    }
}
// seller && console.log("seller profile", seller)
async function getProducts() {
  try {
    await axios
      .get(`/books/sellBooks/${params.id}`)
      .then((productsList) => setProducts(productsList.data.products));
  } catch (error) {
    console.log(error.message);
  }
  setLoading(false)
}
  return (
    <Profile 
    products={products}
    resultAvailable={resultAvailable}
    loading={loading}
    mode={"seller"}
    seller={seller}

    />
  )
}
