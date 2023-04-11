import React from "react";
import logo from "../../imgs/logo.png";

const Banner = () => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" />
        <div className="row justify-content-center">
          <span>A place to </span>
          <span id="get-part">get</span>
          <form>
            <input type="text" id="search-box" name="search-box" />
            <button type="submit">Search</button>
          </form>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
