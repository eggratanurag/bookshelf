import React, { useState, useEffect } from "react";
import Card from "./card.js";
import SearchIcon from "@mui/icons-material/Search";
import noBookFound from "./images/no-book-found.png";
import "./books.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner,Box } from "@chakra-ui/react";
import { UserState } from "../context/userProvider";
import SellerProfile from "./sellerProfile"


export default function Books() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const { user, setUser } = UserState();
  const [resultAvailable, setResultAvailable] = useState(true);
  const Navigate = useNavigate();
  const [input, setInput] = React.useState("");
 

  //useEffects//////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (user) {
      books.map((product) =>
        product.result === "no product found"
          ? setResultAvailable(false)
          : setResultAvailable(true)
      );
    }
    setLoading(false);
  }, [books]);

  useEffect(() => {
    getBooks();
    setLoading(true);
  }, []);
  //useEffects//////////////////////////////////////////////////////////////////////////////

  async function buttonClicked() {
    if (input) {
      try {
        await axios
          .get(`/books/searchBooks/${input}`)
          .then((booksList) =>
            booksList.data.length > 0
              ? setBooks(booksList.data)
              : setBooks([{ result: "no product found" }])
          );
      } catch (error) {
        //  console.log(error);
      }
    } else {
      try {
        await axios
          .get(`/books/buyBooks/${user._id}`)
          .then((booksList) => setBooks(booksList.data.products));
      } catch (error) {
        // console.log(error)
      }
    }
  }


  // console.log(books)
  async function getBooks() {
    if (user) {
      try {
        await axios
          .get(`/books/buyBooks/${user._id}`)
          .then((booksList) => setBooks(booksList.data.products));
      } catch (error) {
        //  console.log(error)
      }
    } else {
      try {
        await axios
          .get(`/books/buyBooks`)
          .then((booksList) => setBooks(booksList.data.products));
      } catch (error) {
        //  console.log(error)
      }
    }
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D" />
        </Box>
      ) : (
        <div className="mainDivForBooksPage">
          <div className="divForSearchInput">
            <div className="inputForm">
              <input
                type="search"
                value={input.experience}
                onChange={(e) => setInput(e.target.value)}
                className="form-control addInput"
                placeholder="search books"
                autoComplete="off"
              />
              <button
                onClick={buttonClicked}
                type="submit"
                className="btn searchButton"
              >
                <SearchIcon id="searchIcon" />
              </button>
             
            </div>
          </div>

          <div className="divForBooks">
            {resultAvailable ? (
              <div className="mainDivForProducts">
                <div className="nestedDivForProducts">
                  {books.map((book) => (
                    <div  key={book._id}>
                      <Card
                        likes={
                          user && user.likes.find((e) => e === book._id)
                            ? true
                            : false
                        }
                        orders={
                          user && user.orders.find((e) => e === book._id)
                            ? true
                            : false
                        }
                        heartMode={true}
                        props={book}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="checkout__emptycart">
                <img src={noBookFound} alt="books list is empty" />
              </div>
            )}
          </div>
          
        </div>
      )}
    </>
  );
}
