import React, {useState, useEffect} from "react";
import classes from "./PropertiesList.module.css";
import PropertyCard from './../PropertyCard/PropertyCard'
import { getProperties }  from './../../helpers/properties';

const PropertiesList = (props) => {

   const [properties, setProperties] = useState([]);

  
   useEffect(() => {

      // from=2020-07-01&to=2020-07-11&guests=2&city=copenhagen&offset=0

      const fetchProperties = async() => {
         const properties = await getProperties('2020-07-01', '2020-07-11', 2, 'copenhagen', 0);
         console.log(properties);
        setProperties(properties)
      }

      fetchProperties();
   }, []) 

   
   // const openPropertyPage = id => {
   //    //code
   // }

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
