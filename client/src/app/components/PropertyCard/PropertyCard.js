import React from "react";
import classes from "./PropertyCard.module.css";

const PropertyCard = (props) => {

    const home = props.home ? ` ${classes.Home}` : '';
    const { id, photos, title, type, price, capacity, rooms, beds, bathrooms } = props.property;

   return (
       <div className={classes.CardContainer + home} onClick={() => props.click(id)}>
           <div className={classes.PropertyImageContainer}>
           <img  src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]}  />
           </div>
           <div className={classes.PropertyDetails}>
               <div className={classes.Type}>{type}</div>
               <div className={classes.PropertyTitle}>{title}</div>
               <div className={classes.Parag}>{capacity} guests {rooms} rooms {beds} bed {bathrooms} bath</div>
               <div className={classes.Price}>{price} DKK/ night</div>
           </div>
       </div>
   )
};

export default PropertyCard;
