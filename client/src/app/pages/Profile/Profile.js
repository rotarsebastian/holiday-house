import React, { useEffect, useState } from "react";
import classes from './Profile.module.css';
import ProfileCard from './../../components/ProfileCard/ProfileCard'
import PropertyCard from './../../components/PropertyCard/PropertyCard'
import { getUserProperties }  from './../../helpers/properties';


const Profile = props => {


    const [properties, setProperties] = useState([]);

  
    useEffect(() => {
  
        const fetchProperties = async() => {
                const properties = await getUserProperties(1,0);
                setProperties(properties.data);
        }

       
       fetchProperties();
       

    }, []) 

   const openPropertyPage = id => {
      //code
   }
    
    return (
        <React.Fragment>
            <div className={classes.ProfileContainer}>
                <div className={classes.ProfileCard}>
                    <ProfileCard />
                </div>

                <div className={classes.Container}>
                    <div className={classes.TitleHistory}>My reservation history</div>
                    <div className={classes.ListContainer}>

                    { properties.map(property => {
                        return (
                            <div className={classes.PropertyCard} key={property.id}>
                            <PropertyCard property={property} title={property.title} photos={property.photos}  
                                        type={property.type} price={property.price} 
                                        capacity={property.capacity} rooms={property.rooms} 
                                        beds={property.beds} bathrooms={property.bathrooms} 
                            click={openPropertyPage} />
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;