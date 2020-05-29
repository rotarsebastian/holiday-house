import React, { useState } from "react";
import "./SlideShow.css";
import { Fade } from 'react-slideshow-image';
// import { useStore } from 'react-context-hook';

// const fadeImages = [
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg',
//     './../../assets/img/LMM-Cover-Images-2.jpg'
//   ];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  pauseOnHover: true,
}

const Slideshow = props => {

  // const [ countLoadedProperties, setCountLoadedProperties ] = useStore('countLoadedProperties');

  const [ imgPath ] = useState('https://holidayhouse1.s3.amazonaws.com/');
  const { photos } = props;

  return (
    <div className={"SlideMainContainer"}>
      <Fade { ...fadeProperties }>
        { photos.map(photo => {
            return (
              <div className={"EachFade"} key={photo}>
                <div className={"ImageContainer"}>
                  <img src={imgPath + photo} alt={photo} />
                </div>
              </div>
            )
        })}
      </Fade>
    </div>
  )
};

export default Slideshow;