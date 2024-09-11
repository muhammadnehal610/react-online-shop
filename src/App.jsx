import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./component/Nav.jsx";
import Home from "./page/Home.jsx";
import Signup from "./page/auth/signup.jsx";
import Signin from "./page/auth/signin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
