import React from "react";
import classes from "./PropertyCard.module.css";

const PropertyCard = (props) => {

    // const { id, images, title, type} = property;
   return (

        // <div className={classes.CardContainer} onClick={() => props.click(id)}>
        //     <div className={classes.PropertyImage}></div>
        //     <div className={classes.PropertyDetails}>
        //         <div className={classes.Type}>Entire House</div>
        //         <div className={classes.PropertyTitle}>Beautiful house by the beach</div>
        //         <div className={classes.Parag}>2 guests 1 bedroom 1 bed 1 bath</div>
        //         <div className={classes.Price}>{price}</div> EXAMPLE
        //     </div>
        // </div>

       <div className={classes.CardContainer}>
           <div className={classes.PropertyImage}></div>
           <div className={classes.PropertyDetails}>
               <div className={classes.Type}>Entire House</div>
               <div className={classes.PropertyTitle}>Beautiful house by the beach</div>
               <div className={classes.Parag}>2 guests 1 bedroom 1 bed 1 bath</div>
               <div className={classes.Price}>200 DKK/ night</div>
           </div>
       </div>
   )
};

export default PropertyCard;
