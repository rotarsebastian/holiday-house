import React, { useEffect, useState } from "react";
import classes from './Profile.module.css';
import ProfileCard from './../../components/ProfileCard/ProfileCard'
import PropertyCard from './../../components/PropertyCard/PropertyCard'
import { getUserProperties }  from './../../helpers/properties';
import { useStoreValue } from 'react-context-hook';

const Profile = props => {

    const user_data = useStoreValue('user');
    const [properties, setProperties] = useState([]);
    // const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchProperties = async() => {
            if(user_data) {
                const properties = await getUserProperties(user_data.id, 0);
                // console.log(properties)
                setProperties(properties.data);
            }
        }

       fetchProperties();
    }, [user_data]) // component didmount - []  || componentWillUpdate - [yourDependency]

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