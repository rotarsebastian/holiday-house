import React from "react";
import classes from './PropertyPage.module.css';
import SlideShow from '../../components/SlideShow/SlideShow';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails'



const Property = props => {
    return (
        <React.Fragment>
            <div className={classes.PropertyContainer}>
             <div><SlideShow/></div>
             <div><PropertyDetails/></div>
            </div>
        </React.Fragment>
    )
}

export default Property;