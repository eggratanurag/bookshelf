import React, { useState, useEffect } from "react";
import emptyBag from "./images/empty-bag.png";
import { Spinner, Box } from "@chakra-ui/react";
import Tray from "./tray";
import { UserState } from "../context/userProvider";
import { OrdersState } from "../context/productProvider";

export default function Bag() {
  const [loading, setLoading] = useState(true);
  const {user, setUser } = UserState();
  const {orders, setOrders} = OrdersState();
  const [resultAvailable, setResultAvailable] = useState(true);
  // console.log(orders)

  // useEffect(() => {
  //   console.log("runnign bag useeffect")
  //   setLoading(true)
  //   if (user) {
    
  //      orders.length === 0
  //          setResultAvailable(false)
  //         : setResultAvailable(true)
   
  //   }else {
  //     setResultAvailable(false);
  //   }
  //   setLoading(false);
  // }, );


  
    // user ? setLoading(true) : setLoading(false)
    

    useEffect(() => {
   
         orders && setLoading(false) 
    },);

   
  return (
    <>
      {loading ? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D" />
        </Box>
      ) : (
        <div style={{justifyContent: "center", display: "flex", flexDirection: "column" ,alignItems: "center"}}>
          <h1 style={{marginTop: "20px"}} className="heading">Orders</h1>

          { orders.length !== 0? (
            <div >
              {orders.map((book) => (
                <div key={book._id}>
                  <Tray 
                  props={book} 
                  mode={"orders"}

                  />
                </div>
              ))}
            </div>
          ) : (
           <div className="wishlistImageDiv">

             <img
               style={{marginTop: "10rem" }}
               src={emptyBag}
               alt=""
             />
           </div>
        
          )}
        </div>
      )}
    </>
  );
}
