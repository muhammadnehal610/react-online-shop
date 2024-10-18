import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Nav.jsx";
import Home from "./page/Home.jsx";
import Signup from "./page/auth/signup.jsx";
import Signin from "./page/auth/signin.jsx";
import Profile from "./page/Proflie.jsx";
import ProductDetail from "./page/ProductDetail.jsx";
import CartList from "./page/Cart.jsx";
import ThankYouPage from "./page/ThankYoy.jsx";
import Purches from "./page/Purches.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/purches" element={<Purches />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/account" element={<Profile />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
