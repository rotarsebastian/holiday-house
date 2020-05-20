import React from "react";
import classes from "./SlideShow.module.css";
import { Fade } from 'react-slideshow-image';
import fadeImages from './../../assets/img/LMM-Cover-Images-2.jpg'
import anotherImage from './../../assets/img/pexels-photo-1396122.jpeg'


// const fadeImages = [
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg'
//   ];

  const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: false,
    indicators: true
  }

const Slideshow = (props) => {
   return (
     <div className={classes.SlideMainContainer}>
    <Fade {...fadeProperties}>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={fadeImages} alt="house1" />
      </div>
    </div>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={anotherImage}  alt="house2"/>
      </div>
    </div>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={fadeImages}  alt="house3"/>
      </div>
    </div>
  </Fade>
  </div>
   )
};

export default Slideshow;