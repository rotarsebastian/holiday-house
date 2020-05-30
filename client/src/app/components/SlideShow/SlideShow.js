import React from "react";
import "./SlideShow.css";
import { Fade } from 'react-slideshow-image';
import { useStore } from 'react-context-hook';

const imgPath = 'https://holidayhouse1.s3.amazonaws.com/';

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  pauseOnHover: true,
  autoplay: false
}

const Slideshow = props => {

  const [ countLoadedImages, setCountLoadedImages ] = useStore('countLoadedImages');

  const setImgLoaded = () => setCountLoadedImages(countLoadedImages + 1);
  const { photos } = props;

  return (
    <div className={"SlideMainContainer"}>
      {
        photos.length === 1
        ?
        <div className={"EachFade"}>
          <div className={"ImageContainer"}>
            <img src={imgPath + photos[0]} alt={photos[0]} onLoad={setImgLoaded} />
          </div>
        </div>
        :
        <Fade { ...fadeProperties }>
        { photos.map(photo => {
            return (
              <div className={"EachFade"} key={photo}>
                <div className={"ImageContainer"}>
                  <img src={imgPath + photo} alt={photo} onLoad={setImgLoaded} />
                </div>
              </div>
            )
        })}
      </Fade>
      }
    </div>
  )
};

export default Slideshow;