import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo, logoRavalbit } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header
        className="w-full flex justify-between items-center
       bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link
          to="/"
          className="flex flex-row gap-3 items-center justify-center"
        >
          <img src={logo} alt="logo" className="w-28 object-contain" />X
          <div className="flex flex-row items-center justify-center">
            <img
              src={logoRavalbit}
              alt="ravalbit-logo"
              className="w-12 object-contain "
            />
            <p className="text-[18px] text-black font-bold">RavalBit</p>
          </div>
        </Link>
        <Link
          to="/create-post"
          className="font-poppins font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
