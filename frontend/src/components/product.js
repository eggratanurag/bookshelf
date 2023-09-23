import React from "react";
import Card from "./card";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./product.css";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import noBookAdded from "./images/no-book-added.png";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Spinner } from "@chakra-ui/react";
import { UserState } from "../context/userProvider";
import {
  useToast,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";

export default function Product() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [infoOfDeletingProduct, setinfoOfDeletingProduct] = useState("");
  const [resultAvailable, setResultAvailable] = useState(true);
  const [dStyle, setDStyle] = useState({});
  const [uStyle, setUStyle] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const Navigate = useNavigate();
  const toast = useToast();
  const { user, setUser } = UserState();
 
  ///////////////////////////////useEffects////////////////////////////////////////
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

  useEffect(() => {
    if (user) {
      getProducts();
      setLoading(true);
    } else {
      setResultAvailable(false);
    }
  },[user]);
  ///////////////////////////////useEffects////////////////////////////////////////

  async function getProducts() {
    try {
      await axios
        .get(`/books/sellBooks/${user._id}`)
        .then((productsList) => setProducts(productsList.data.products));
    } catch (error) {
      console.log(error.message);
    }
    getProducts();
  }

 

  // delete process is in two phases ///////////////////////////////////////////////////////////////////////////////////////////////////
  function deleteStep1(_id) {
    const foundProduct = products.find((object) => object._id === _id);
    setinfoOfDeletingProduct(foundProduct);
  }

  async function finalDelete() {
    try {
      await axios.delete(`/books/updateBook/${infoOfDeletingProduct._id}`);
      toast({
        title: "removed book",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
     console.log(error)
    }
 

    // getProducts();
  }
  //saving the products /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function saveButtonClicked() {
    setUStyle({});
    setDStyle({});
    setDeleteMode(false);
    setUpdateMode(false);
  }

  //updating the products///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function deleteButtonStyle() {
    setUpdateMode(true);
    setDeleteMode(false);
    setDStyle({
      color: "#375a64",
      backgroundColor: "#e6b0a1",
    });
    setUStyle({});
  }
  function updateButtonStyle() {
    setDeleteMode(true);
    setUpdateMode(false);
    setUStyle({
      color: "#375a64",
      backgroundColor: "#e6b0a1",
    });
    setDStyle({});
  }

  return (
    <>
      {loading ? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D" />
        </Box>
      ) : (
        <span>
          {resultAvailable ? (
            <>
              <div className="divForSideButtons">
                <button
                  className="sideButtons"
                  onClick={() => Navigate("/products/add-product")}
                >
                  <AddIcon />
                </button>
              
                <button
                  className="sideButtons"
                  style={dStyle}
                  onClick={() => {
                    deleteButtonStyle();
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="sideButtons"
                  style={uStyle}
                  onClick={() => {
                    updateButtonStyle();
                  }}
                >
                  <DeleteIcon />
                </button>

                {(deleteMode || updateMode) && (
                  <button className="sideButtons" onClick={saveButtonClicked}>
                    <SaveIcon />
                  </button>
                )}
              </div>
              <div className="mainDivForProducts">
                <div className="nestedDivForProducts">
                  {products.map((product) => (
                    <div key={product._id}>
                      <Card
                        Open={onOpen}
                        deleteStep1={deleteStep1}
                        props={product}
                        deleteMode={deleteMode}
                        updateMode={updateMode}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>Removing book?</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    {`do you no longer want to sell ${infoOfDeletingProduct.name} from ${infoOfDeletingProduct.brand}`}
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button
                      className="cancelButton"
                      ref={cancelRef}
                      onClick={() => {
                        onClose();
                      }}
                    >
                      cancel
                    </Button>
                   
                    <Button
                      className="deleteButton"
                      onClick={() => {
                        finalDelete();
                        onClose();
                      }}
                      ml={3}
                    >
                      remove
                    </Button>
                
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <div className="checkout__emptycart">
              <button
                className="sideButtons"
                onClick={() => user ? Navigate("/products/add-product") : Navigate("/user/login")}
              >
                <AddIcon />
              </button>
              <img src={noBookAdded} alt="product list is empty" />
            </div>
          )}
        </span>
      )}
    </>
  );
}
