import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./card.js";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserState } from "../context/userProvider.js";
import "./profile.css";
import {
  useToast,
  Box,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

import { Spinner } from "@chakra-ui/react";

export default function Profile({products, resultAvailable, loading, logout, mode,seller}) {

  const { user, setUser } = UserState();
  const Navigate = useNavigate();
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(seller);
  // console.log(user);


  return (
    <>
      {loading ? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D"/>
        </Box>
      ) : (
        <>
          {seller && (
            <div className="gradient-custom-2 ">
              <MDBContainer className="py-5 h-100 ">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol lg="9" xl="7">
                    <MDBCard className="mainDivForProfile">
                      <div
                        className="rounded-top text-white d-flex flex-row"
                        style={{ backgroundColor: "#1a2e35", height: "200px" }}
                      >
                        <div
                          className="ms-4 mt-5 d-flex flex-column"
                          style={{ width: "150px" }}
                        >
                          <MDBCardImage
                            src={seller.pic}
                            alt="Generic placeholder image"
                            className="mt-4 mb-2 img-thumbnail"
                            fluid
                            style={{ width: "150px", zIndex: "1" }}
                          />
                        </div>
                        <div className="ms-3" style={{ marginTop: "130px" }}>
                          <MDBTypography tag="h5">{seller.name}</MDBTypography>
                          <MDBCardText>{seller.state}</MDBCardText>
                        </div>
                        {mode==="user" &&
                        <>
                        <Menu>
                          <MenuButton
                            style={{
                              position: "absolute",
                              right: "20px",
                              top: "20px",
                            }}
                            as={MoreVertIcon}
                            aria-label="Options"
                            icon={<MoreVertIcon />}
                            variant="outline"
                          />
                          <MenuList>
                            <MenuItem
                              onClick={() => Navigate("/user/updateProfile")}
                              style={{ color: "#1a2e35" }}
                            >
                              edit profile
                            </MenuItem>
                            <MenuItem
                              onClick={onOpen}
                              style={{ color: "#1a2e35" }}
                            >
                              logout
                            </MenuItem>
                          </MenuList>
                        </Menu>
                        
                        <AlertDialog
                          motionPreset="slideInBottom"
                          leastDestructiveRef={cancelRef}
                          onClose={onClose}
                          isOpen={isOpen}
                          isCentered
                        >
                          <AlertDialogOverlay />

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              do you want to logout ?
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />

                            <AlertDialogFooter>
                              <Button
                                className="cancelButton"
                                ref={cancelRef}
                                onClick={() => {
                                  onClose();
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="deleteButton"
                                onClick={() => {
                                  logout();
                                  onClose();
                                }}
                                ml={3}
                              >
                                Logout
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </>
                        }
                        
                      </div>
                      <div
                        className="p-4 text-black"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div className="d-flex justify-content-end text-center py-1">
                          <div className="px-3">
                            <MDBCardText className="mb-1 h5">
                              {resultAvailable ? products.length : 0}
                            </MDBCardText>
                            <MDBCardText className="small text-muted mb-0">
                              Book
                            </MDBCardText>
                          </div>
                        </div>
                      </div>
                      <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                          <p className="lead fw-normal mb-1">Contact</p>
                          <div
                            className="p-4"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <MDBCardText className="font-italic mb-1">
                              Email: {seller.email}
                            </MDBCardText>
                            <MDBCardText className="font-italic mb-1">
                              Contact No.: {seller.mob}
                            </MDBCardText>
                          </div>
                        </div>
                        {resultAvailable && (
                          <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <MDBCardText className="lead fw-normal mb-0">
                               {resultAvailable && (mode==="user"? "Books you've added" :"Books they are selling")}
                              </MDBCardText>
                            </div>

                            <MDBRow>
                              {products.map((product) => (
                                <MDBCol className="mb-2">
                                  <div key={product._id}>
                                  {mode==="user"? 
                                  <Card showMode={"showMode"} props={product} />
                                  :
                                  <Card 
                                  likes={
                                    user && user.likes.find((e) => e === product._id)
                                      ? true
                                      : false
                                  }
                                  orders={
                                    user && user.orders.find((e) => e === product._id)
                                      ? true
                                      : false
                                  }
                                  heartMode={true} 
                                  props={product} 
                                  />
                                  }
                                  </div>
                                  
                                </MDBCol>
                              ))}
                            </MDBRow>
                          </>
                        )}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          )}
        </>
      )}
    </>
  );
}