import React from "react";
import classes from "./SlideShow.module.css";
import { Fade } from 'react-slideshow-image';
import anotherImage from './../../assets/img/pexels-photo-1396122.jpeg'
import anotheroneImage from './../../assets/img/image-asset.jpeg'


// const fadeImages = [
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg'
//   ];

  const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
  }

const Slideshow = (props) => {
   return (
     <div className={classes.SlideMainContainer}>
    <Fade {...fadeProperties}>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={anotheroneImage} alt="house1" />
      </div>
    </div>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={anotherImage}  alt="house2"/>
      </div>
    </div>
    <div className={classes.EachFade}>
      <div className={classes.ImageContainer}>
        <img src={anotheroneImage}  alt="house3"/>
      </div>
    </div>
  </Fade>
  </div>
   )
};

export default Slideshow;