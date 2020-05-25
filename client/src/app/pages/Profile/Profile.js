import React, { useEffect, useState } from "react";
import classes from './Profile.module.css';
import ProfileCard from './../../components/ProfileCard/ProfileCard'
import PropertyCard from './../../components/PropertyCard/PropertyCard'
import { getUserProperties }  from './../../helpers/properties';
import { useStoreValue } from 'react-context-hook';
import { useHistory } from 'react-router-dom';

const Profile = props => {
    const history = useHistory();
    const user_data = useStoreValue('user');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        document.querySelector('body').classList.add('profile');
        const fetchProperties = async() => {
            if(user_data) {
                const properties = await getUserProperties(user_data.id, 0);
                // console.log(properties)
                setProperties(properties.data);
            }
        }

       fetchProperties();
    }, [user_data]) // component didmount - []  || componentWillUpdate - [yourDependency]

    const openPropertyPage = id => history.push(`/property/${id}`);
    
    return (
        <React.Fragment>
            <div className={classes.ProfileContainer}>
                <div className={classes.ProfileCard}>
                    <ProfileCard user={user_data ? user_data : undefined}/>
                </div>
                <div className={classes.ListsContainer}>
                    <div className={classes.MyPropertiesContainer}>
                        <div className={classes.TitleHistory}>My properties</div>
                        <div className={classes.MyPropertiesList}>
                        { properties.map(property => {
                            return (
                                <div className={classes.PropertyCard} key={property.id}>
                                    <PropertyCard property={property} click={openPropertyPage} from={'Profile'} />
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className={classes.MyReservationsContainer}>
                        <div className={classes.TitleHistory}>My reservations</div>
                        <div className={classes.MyReservationsList}>
                        { properties.map(property => {
                            return (
                                <div className={classes.PropertyCard} key={property.id}>
                                    <PropertyCard property={property} click={openPropertyPage} from={'Profile'} />
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;