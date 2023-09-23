import React, { useEffect, useState } from "react";
import "./home.css";
import landingPageImage from "./images/landingPage.png";
import bookShop from "./images/book-shop.png";
import addProductForm from "./images/add-product-form.png";
import manReadingBook from "./images/man-reading-book.png";
import signInPage from "./images/sign-in-page.png";
import { Spinner, Box } from "@chakra-ui/react";
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { UserState } from "../context/userProvider";
import { Button } from "@chakra-ui/react";
import Guide from "./guide"
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Home() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = UserState();


//                         animation useeffects

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const faders = document.getElementsByClassName("divForIcon");

    for(var fader of faders) {
      appearOnScroll.observe(fader);
    }
  

    const sliders = document.getElementsByClassName("slideIn");
      for(var slider of sliders) {
        appearOnScroll.observe(slider);
      }
   
  });
//                         animation useeffects
  

return (
    <>
      {loading ? (
        <Box>
          <Spinner style={{ marginTop: "20%" }} color="#ED8D8D" />
        </Box>
      ) : (
        <div>
          <section className="first-section">
            <div className="container">
              <div className="divForLdPage">
                <div className="ldPageHeadingDiv">
                  <h1 className="ldPageHeading">
                     Find the needed books for the needy.
                  </h1>
                  <div>
                    <button
                      onClick={() => Navigate("/books")}
                      className="btn ldPageButton1"
                    >
                      checkout books
                    </button>
                    <button
                      onClick={() =>
                        user
                          ? Navigate("/products/add-product")
                          : Navigate("user/login")
                      }
                      className="btn btn-outline-light ldPageButton2"
                    >
                      donate books
                    </button>
                  </div>
                </div>
                <div className="ldPageImgDiv">
                  <img
                    className="ldPageImage"
                    src={landingPageImage}
                    alt="landing page"
                  />
                </div>
              </div>
            </div>
          </section>

          <section style={{backgroundColor: "white"}}>
            <div className="container">
              <div className="divForIcons">
                <div className="divForIcon fade-in">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="whiteSectionIcon"
                  />
                  <h1 className="heading">you are the buyer</h1>
                </div>

                <div className="divForIcon fade-in">
                  <FontAwesomeIcon icon={faShop} className="whiteSectionIcon" />
                  <h1 className="heading">you are the seller</h1>
                </div>
              </div>
            </div>

            <div className="guideDiv">
              <Guide heading={"Login"} src={signInPage} text={"login or register to create a profile to sell or buy books"}/>
              <Guide heading={"sell books"} src={addProductForm} text={"headout to sell books page and add books info to sell some"}/>
              <Guide heading={"buy books"} src={bookShop} text={"headout to the books section to checkout books and get"}/>
              <Guide heading={"Enjoy"} src={manReadingBook} text={"just contact the seller and order them. Read some and enjoy"}/>
            </div>

          </section>
          <section style={{backgroundColor: "#e6b0a1"}}>
            <div className="container">
              <h1 style={{color:"#1a2e35", textDecoration: "underline", marginBottom:"3rem"}} className="ldPageHeading">50% Policy.</h1>
              <h1 className="fiftytext">the only policy of bookShelf is to sell the books at 50% of the actual price of the book or maybe donate them if possible.</h1>
              <h1 className="fiftytext">donating books is our key priority though it's okay to get some revenue out of your spare books.</h1>
             
          
            </div>
          </section>

          <section className="colored-section">
            <div className="container love">
              <h1 className="heading">
                Find the True Love of Your Book Life Today.
              </h1>
              <div className="checkOutBtnDiv">
              {user ? (
                <Button className="nButton" onClick={() => Navigate("/books")}>buy some</Button>
                ) : (
                <Button className="nButton" onClick={() => Navigate("/user/login")}>Login</Button>
              )}
             
             
              {user ? (
                <Button className="nButton" onClick={() => Navigate("/sell")}>Sell books</Button>
                ) : (
                <Button className="nButton" onClick={() => Navigate("/user/signup")}>Sign up</Button>
              )}
              </div>
            </div>
          </section>

          <footer className="footer" >
            <div className="container footerDiv">
              <div className="footerDiv">
              
              <a className="navlinks" href={'https://twitter.com/eggrat__'}><TwitterIcon/></a>
              <a className="navlinks" href={'https://www.instagram.com/eggrat__/'}><InstagramIcon/></a>
              <a className="navlinks" href={'https://github.com/eggratanurag'}><GitHubIcon/></a>
              <a className="navlinks" href={'https://www.linkedin.com/in/eggrat/'}><LinkedInIcon/></a>
              </div>
             
            <div>
              <NavLink className="navlinks" to={'/contact'}>contact us</NavLink>
              <br></br>
              <NavLink className="navlinks" to={"/about"}>about us</NavLink>
            </div>
            </div>
              <p>© Copyright 2022 BookShelf</p>
          </footer>
        </div>
      )}
    </>
  );
}
