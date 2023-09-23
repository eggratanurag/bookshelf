import React, { useState, useEffect } from "react";
import wishListIsEmpty from "./images/wishlist-is-empty.png";
import { Spinner, Box } from "@chakra-ui/react";
import Tray from "./tray";
import { UserState } from "../context/userProvider";
import { WishlistState } from "../context/productProvider";
export default function Wishlist() {
  const [loading, setLoading] = useState(true);
  const {user, setUser } = UserState();
  const {wishlist, setWishlist} = WishlistState();
  const [resultAvailable, setResultAvailable] = useState(true);


  useEffect(() => {
   
      wishlist && setLoading(false)
   
 },);



  return (
    <>
      {loading? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D" />
        </Box>
      ) : (
        <div style={{justifyContent: "center", display: "flex", flexDirection: "column" ,alignItems: "center"}}>
          <h1 style={{marginTop: "20px"}} className="heading">Wishlist</h1>
          { wishlist.length !== 0? (
            <div>
              {wishlist.map((book) => (
                <div key={book._id}>
                  <Tray 
                  props={book} 
                  order={
                    user && user.orders.find((e) => e === book._id)
                      ? true
                      : false
                  }
                  mode={"wishlist"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="wishlistImageDiv">
             <img
       style={{marginTop: "10rem" }}
       src={wishListIsEmpty}
       alt=""
        />
                
            
            </div>
          )}
        </div>
       )} 
    </>
  );
}
