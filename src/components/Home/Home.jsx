import "./Home.module.css";
import Navbar from "../Navbar/Navbar";
import CardContainer from "../CardContainer/CardContainer";
import Footer from "../Footer/Footer";
import Filters from "../Filters/Filters";
import ControlledCarousel from "../Carousel/Carousel";
import React, { forwardRef } from 'react';
import Favorites from "../Favorites/Favorites"

const Home = (props, ref) => {
  return (
    <div>
      <Navbar />
      <ControlledCarousel />
      <Favorites />
      <Filters />
      <CardContainer ref={ref} />
      <Footer />
    </div>
  );
};

export default forwardRef(Home);
