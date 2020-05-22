import React, { useState, useEffect } from "react";
import classes from './PropertyPage.module.css';
import SlideShow from '../../components/SlideShow/SlideShow';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails'
import { useStoreValue } from 'react-context-hook';
import { getOneProperty }  from './../../helpers/properties';


const Property = props => {
    const id = window.location.pathname.split('/')[2];

    const user_data = useStoreValue('user');
    const [property, setProperty] = useState([]);
    
    
    useEffect(() => {
        const fetchProperty = async() => {
            if(user_data) {
                const property = await getOneProperty(id);
                console.log(property)
                setProperty(property.data);

            }
        }

       fetchProperty();
    }, [user_data, id]) // component didmount - []  || componentWillUpdate - [yourDependency]

   console.log(property.address);
    

    return (
        <React.Fragment>
            <div className={classes.PropertyContainer}>
             <div><SlideShow/></div>
             <div><PropertyDetails property={property} /></div>
            </div>
        </React.Fragment>
    )
}

export default Property;