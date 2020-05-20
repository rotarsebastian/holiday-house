import React from "react";
import classes from "./PropertiesList.module.css";
import PropertyCard from './../PropertyCard/PropertyCard'
const PropertiesList = (props) => {

   // const [properties, setProperties] = useState([]);

   
   // useEffect(() => {

   //    const fetchProperties = async() => {
   //       const res = await fetch(...)
   //       // const data = await res.json();
   //       // console check data
   //       // setProperties(data)
   //    }

   //    fetchProperties();
   // }, []) 

   // const openPropertyPage = id => {
   //    //code
   // }

   return (
       <div className={classes.ListContainer}>
         {/* { PropertiesList.map(property => {
            return (
               <div className={classes.PropertyCard}><PropertyCard property={property} click={openPropertyPage} /></div>
            )
         })} */}
         <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
          <div className={classes.PropertyCard}><PropertyCard/></div>
       </div>
   )
};

export default PropertiesList;
