import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import bookImage from "./images/book.png";
import axios from "axios";
import "./tray.css";
import { UserState } from "../context/userProvider";
import { useToast } from "@chakra-ui/react";
import { WishlistState } from "../context/productProvider";
import { OrdersState } from "../context/productProvider";

export default function LongCard({ props, mode,order }) {
  const [orderLoading, setorderLoading] = useState(false);
  const [seller, setSeller] = useState({});
  const [wishlistLoading, setwishlistLoading] = useState(false);
  const { _id, name, price, brand, category, userId, src } = props;
  const { wishlist, setWishlist } = WishlistState();
  const [fetchOrders, setFetchOrders] = useState(order);
  const { user, setUser } = UserState();
  const { orders, setOrders } = OrdersState();
  const Navigate = useNavigate();

  const Toast = useToast();

  async function handleClicked(bookId, list, action) {
   list === "wishlist" && setwishlistLoading(true);
   list === "orders" && setorderLoading(true);


    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          list: list,
          action: action,
        },
      };
      const result = await axios.put(
        `/api/user/updateUser/feed/${user._id}/${bookId}`,
        { list, action },
        config
      );
      // console.log(result.data);
      setUser(result.data);

      action === "remove" &&
        Toast({
          title: `book removed from ${
            list === "wishlist" ? "wishlist" : "bag"
          }`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
      action === "add" &&
        Toast({
          title: `book added to bag`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="tray">
      <div className="trayImageDiv">
        <img src={!src ? bookImage : src} alt="book" />
      </div>
      <div className="trayHeading">
        <h1 className="CardH1">{name}</h1>

        <p>
          {price !== "free" && <strong>₹ </strong>}
          {price}
        </p>
        <p>{brand}</p>
        <div className="divFordescription">
          <p className="cardP">{category}</p>
        </div>
        <div className="trayButtonDiv">
          {mode === "wishlist" ? (
            <Button
              isLoading={wishlistLoading}
              className="nButton"
              onClick={() => handleClicked(_id, "wishlist", "remove")}
            >
              remove
            </Button>
          ) : (
            <>
            <Button
              isLoading={orderLoading}
              className="nButton"
              onClick={() => handleClicked(_id, "orders", "remove")}
            >
              remove 
            </Button>
            <Button
             
              className="nButton"
              onClick={() => Navigate('/sellerProfile/' + userId)}
            >
              contact seller
            </Button>
            </>
          )}
          {mode === "wishlist" && (
          fetchOrders?
          <Button
              className="nButton"
              isLoading={orderLoading}
              onClick={() => handleClicked(_id, "orders", "remove")}
            >
              remove from bag
            </Button>
            :
            <Button
              className="nButton"
              isLoading={orderLoading}
              onClick={() => handleClicked(_id, "orders", "add")}
            >
              add to bag
            </Button>
            
            
          )}
        </div>
      </div>
    </div>
  );
}
