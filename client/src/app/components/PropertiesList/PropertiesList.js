import React from "react";
import classes from "./PropertiesList.module.css";
import PropertyCard from './../PropertyCard/PropertyCard'
const PropertiesList = (props) => {
   return (
       <div className={classes.ListContainer}>
         <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
       </div>
   )
};

export default PropertiesList;
