import {createContext, useContext, useEffect, useState} from "react";
import { UserState } from "../context/userProvider";

import axios from "axios";
const wishlistContext = createContext();
const ordersContext = createContext();

const WishlistProvider = ({children})=> {

  const { user, setUser } = UserState();
  // user && console.log(user.likes)
  
    const [wishlist, setWishlist]= useState([]);
  //  console.log(wishlist, "from product provider")
    async function getWishlist (bookId) {
       
        try {    
          // console.log("fetching wiwshlist")
          await axios
             .get(`/books/updateBook/${bookId}`)
             .then(book => book.data)
            //  .then(book => console.log(book))
             .then(book => setWishlist(prev => {return [...prev, book]}));
         } catch (error) {
          console.log(error)
         }
      }

async function createWishList () {
        // console.log("calling createWishList")    
      user && user.likes.map(e => getWishlist(e))   
}

    useEffect(()=> {
      // console.log('running product provider use effect')
      setWishlist([])
           createWishList();
        
    },[user])

return <wishlistContext.Provider value={{wishlist, setWishlist}}>
        {children}
        </wishlistContext.Provider>
}


const OrdersProvider = ({children})=> {

  const { user, setUser } = UserState();

    const [orders, setOrders]= useState([]);
    

    async function getOrders (bookId) {
       
        try {    
          await axios
             .get(`/books/updateBook/${bookId}`)
             .then(book => book.data)
            //  .then(book => console.log(book))
             .then(book => setOrders(prev => {return [...prev, book]}));
         } catch (error) {
          console.log(error)
         }
      }
 
      function createOrdersList () {
        user.orders.map(e => getOrders(e))
       
    }

    useEffect(()=> {
      setOrders([])
      if(user) {
        createOrdersList();
      }
     
        
    },[user])

return <ordersContext.Provider value={{orders, setOrders}}>
        {children}
        </ordersContext.Provider>
}

export const WishlistState = () => {
   return useContext(wishlistContext);
}
export const OrdersState = () => {
   return useContext(ordersContext);
}
export {WishlistProvider} ;
export {OrdersProvider};