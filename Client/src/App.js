
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import InicialPage from "./pages/InicialPage";
import { Route, Routes, useHref } from "react-router-dom";
import { Detail } from "./pages/Detail";
import Footer from "./components/Footer";
import { About } from "./pages/About";
import Cart from "./pages/Cart";
import Authorize from "./pages/Authorize";
import User from "./pages/User";
import Payment from "./pages/Payment/Payment";
import { useSelector, useDispatch } from "react-redux";
import ScrollAnimate from "./components/ScrollAnimate";

import NavBar from "./components/NavBar";
import Questions from "./pages/Questions";



const server = {
  local: "http://localhost:5000",
  production: "https://wgxjjo-5000.csb.app",
};

function App() {
  const dispatch = useDispatch();
  const { setter } = useSelector(({ state }) => state.server);
  const href = useHref();
  dispatch(setter({ keys: "state.server.url", value: server.local }));
  const [page, setPage] = useState("/");
  useEffect(() => {
    setPage(href);
  }, [href]);
  console.log("back=",useSelector(({ state }) => state.server.url),"front=",page);
  


  return (
    <div>
      {page !== "/" && <NavBar />}

      <Routes>
        <Route path="/" element={<InicialPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/token/:token" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment/:res" element={<Payment />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/user" element={<User />} />
        <Route path="/questions" element={<Questions/>} />
     
      </Routes>

      {page !== "/" && <ScrollAnimate footer={<Footer />} />}

    </div>
  );
}

export default App;
