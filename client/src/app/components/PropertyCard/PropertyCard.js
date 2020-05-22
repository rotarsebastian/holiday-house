import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import classes from "./PropertyCard.module.css";

const PropertyCard = (props) => {

    const home = props.home ? ` ${classes.Home}` : '';
    const profile = props.profile ? ` ${classes.Profile}` : '';

    const { id, photos, title, type, price, capacity, rooms, beds, bathrooms } = props.property;

   return (
       <div className={classes.CardContainer + home + profile} onClick={() => props.click(id)}>
           <div className={classes.PropertyImageContainer}>
           <img  src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]}  />
           </div>
           <div className={classes.PropertyDetails}>
                <div className={classes.Type}>{type}</div>
                <div><FontAwesomeIcon className={classes.Trash} icon={faTrashAlt}/> </div>
               <div className={classes.PropertyTitle}>{title}</div>
               <div className={classes.Parag}>
                    {capacity} { parseInt(capacity) > 1 ? ' guests' : ' guest' } {rooms} { parseInt(rooms) > 1 ? ' rooms' : ' room' } {beds} { parseInt(beds) > 1 ? ' beds' : ' bed' } {bathrooms}  {parseInt(bathrooms) > 1 ? ' baths' : ' bath' }
                </div>
               <div className={classes.Price}>{price} DKK/ night</div>
               <button className={classes.Button } type="button">Edit</button>
           </div>
       </div>
   )
};

export default PropertyCard;
