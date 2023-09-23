import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card.js";
import axios from "axios";
import { UserState } from "../context/userProvider.js";
import Profile from "./profile.js"

export default function UserProfile() {
  const { user, setUser } = UserState();
  const [loading, setLoading] = useState(true);
  const [resultAvailable, setResultAvailable] = useState(true);
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();
  const cancelRef = useRef();
  


  // console.log(user);

  useEffect(() => {
    if (user) {
      products.map((product) =>
        product.result === "no product found"
          ? setResultAvailable(false)
          : setResultAvailable(true)
      );
    }
    setLoading(false);
  }, [products]);

  // products && console.log(products)
  // useEffect(() => {
  //   user && 
  // });
  useEffect(() => {
    user && getProducts();
    user && setLoading(false);;
  }, []);
  // console.log("user profile", user)
  async function getProducts() { 
    try {
      await axios
        .get(`/books/sellBooks/${user._id}`)
        .then((productsList) => setProducts(productsList.data.products));
    } catch (error) {
      console.log(error.message);
    }
  }
  function logout() {
    setLoading(true)
    localStorage.clear();
    Navigate('/')
    window.location.reload();
    setLoading(false)
  }
// console.log(resultAvailable)
  return (
    <Profile 
    logout={logout}
    products={products}
    resultAvailable={resultAvailable}
    loading={loading}
    mode={"user"}
    seller={user}

    />
  )
}
