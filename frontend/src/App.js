import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import Header from "./components/header.js";
import Home from "./components/home.js";
import Login from "./components/login.js";
import Product from "./components/product.js";
import Signup from "./components/signup.js";
import AddProduct from "./components/addProduct";
import UpdateProduct from "./components/updateProduct.js";
import Books from "./components/books.js";
import WishList from "./components/wishlist.js";
import Bag from "./components/bag.js";
import UserProfile from "./components/userProfile";
import SellerProfile from "./components/sellerProfile";
import UpdateProfile from "./components/updateProfile.js";
import Contact from "./components/contact.js";
import About from "./components/about.js"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/books" element={<Books />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/orders" element={<Bag />} />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route path="/sellerProfile/:id" element={<SellerProfile />} />
          <Route path="/user/updateProfile" element={<UpdateProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
              
          <Route path="/products/add-product" element={<AddProduct />} />
          <Route path="/products/update-product/:id" element={<UpdateProduct />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
