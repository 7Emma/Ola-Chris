import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Products from "../pages/Products";
import ProductsDetails from "../pages/ProductsDetails";
import Contact from "../pages/Contact";
import Offer from "../pages/Offer";

function AppContext(){
    return(
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/details" element={<ProductsDetails />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/offer" element={<Offer />}></Route>
        </Routes>
    )
}

export default AppContext