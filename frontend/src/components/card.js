import "./card.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookImage from "./images/book.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { UserState } from "../context/userProvider";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Box,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

function Card({
  likes,
  orders,
  Open,
  deleteStep1,
  props,
  deleteMode,
  updateMode,
  heartMode,
}) {
  const { _id, name, brand, price, src, category, userId, createdAt } = props;
  const Navigate = useNavigate();
  const Toast = useToast();
  const [fetchLiked, setFetchLiked] = useState(likes);
  const [fetchOrders, setFetchOrders] = useState(orders);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { user, setUser } = UserState();
  // console.log(fetchLiked, fetchOrders)
  async function handleClicked(bookId, list, action) {
    list === "wishlist" && action === "add"
      ? setFetchLiked(true)
      : list === "wishlist" && action === "remove"
      ? setFetchLiked(false)
      : list === "orders" && action === "add"
      ? setFetchOrders(true)
      : setFetchOrders(false);

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
      // console.log(result.data, "from card");
      setUser(result.data);

      action === "add" &&
        Toast({
          title: `book added to ${list === "wishlist" ? "wishlist" : "bag"}`,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
    } catch (error) {
      console.log(error);
    }
  }
  function dateConverter(createdAt) {
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "june",
      "july",
      "aug",
      "sept",
      "oct",
      "nov",
      "dec",
    ];
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const string = createdAt;
    const monthName = months[string.slice(5, 7).replace("0", "") - 1];
    const day = days[string.slice(8, 10).replace("0", "") - 1];
    const year = string.slice(0, 4);
    return day + ", " + monthName + ", " + year;
  }

  return (
    <div className="note">
      <div onClick={onOpen} className="divForCardImg">
        <img src={!src ? bookImage : src} alt="product" />
      </div>
      <div onClick={onOpen} className="divForCardHeading">
        <h1 className="CardH1">{!name ? "book name" : name}</h1>

        <p>
          {price !== "free" && <strong>₹ </strong>}
          {!price ? "xx" : price}
        </p>
        <p>{!brand ? "brand name" : brand}</p>
      </div>
      <div>
        <div>
          {deleteMode && (
            <Button
              className="nButton"
              onClick={() => {
                Open();
                deleteStep1(_id);
              }}
            >
              remove
            </Button>
          )}
          {updateMode && (
            <Button
              className="nButton"
              onClick={() => Navigate("/products/update-product/" + _id)}
            >
              Edit
            </Button>
          )}
        </div>

        {heartMode && (
          <div className="heartModeButton">
            {fetchOrders ? (
              <Button
                className="nButton"
                onClick={() => {
                  handleClicked(_id, "orders", "remove");
                }}
              >
                remove from bag
              </Button>
            ) : (
              <Button
                className="nButton"
                onClick={() => {
                  user
                    ? handleClicked(_id, "orders", "add")
                    : Navigate("/user/login");
                }}
              >
                add to bag
              </Button>
            )}
            {fetchLiked ? (
              <FavoriteIcon
                onClick={() => {
                  handleClicked(_id, "wishlist", "remove");
                }}
                className="heartButton"
                style={{ fontSize: "2rem", color: "#ED8D8D" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => {
                  user
                    ? handleClicked(_id, "wishlist", "add")
                    : Navigate("/user/login");
                }}
                className="heartButton"
                style={{ fontSize: "2rem" }}
              />
            )}
          </div>
        )}
      </div>
      {heartMode && (
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{name}</DrawerHeader>

            <DrawerBody style={{ textAlign: "left" }}>
              <Stack spacing="24px">
                <Box>
                  <p>{createdAt && dateConverter(createdAt)}</p>
                </Box>

                <Box>
                  <img src={src} alt="" />
                </Box>

                <Box>
                  <p>
                    {price !== "free" && <strong>₹ </strong>}
                    {!price ? "xx" : price}
                  </p>
                  <p>{!brand ? "brand name" : brand}</p>
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">Description:</FormLabel>
                  <FormLabel htmlFor="desc">
                    <p>{category}</p>
                  </FormLabel>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                className="nButton"
                onClick={() => Navigate("/sellerProfile/" + userId)}
              >
                Seller Profile
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default Card;
