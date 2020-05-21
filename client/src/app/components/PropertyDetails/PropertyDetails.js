import React from 'react';
import classes from './PropertyDetails.module.css'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const OrderButton = withStyles({
    root: {
       padding:'.5rem 3rem',
       color: 'white',
       fontWeight: 'bold',
       fontSize: '17px',
       backgroundColor: '#E4215B',
       boxShadow: 'none',
       '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#f02551'
       },
       '&:focused': {
          boxShadow: 'none',
          backgroundColor: 'black'
       },
       '&:active': {
          boxShadow: 'none',
          transition: '0.1s',
          color: 'pink',
          
       },
       textTransform: 'none'
    }
 })(Button);

const PropertyDetails = (props) => {

    return (
        <div className={classes.PropertyDetailsContainer}>
            <div  className={classes.PropertyInfo}>Entire house</div>
            <div className={classes.PropertyTitle}>Beautiful house by the beach</div>
            <div className={classes.PropertyInfoRooms} >2 guests 1 bedroom 1 bed 1 bath</div>
            <div className={classes.PropertyDetails}>
                <div className={classes.PropertyDetailTitle}>Description</div>
                <div className={classes.PropertyInfo}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</div>
         
            <div>
                <div  className={classes.PropertyDetailTitle}>Address</div>
                <div className={classes.PropertyInfo}>Lorem Ipsum is simply dummy text of the printing and </div>
            </div>
            <div>
                <div  className={classes.PropertyDetailTitle}>Facilities</div>
                <div className={classes.PropertyInfo}>Kitchen Free Parking Washer Wifi</div>
            </div>
            <div>
                <div  className={classes.PropertyDetailTitle}>Hosted by</div>
                <div className={classes.PropertyInfo}>Andreea Steriu</div>
            </div>
            </div>
            <div className={classes.PropertyOrderContainer} >
                <OrderButton><span className={classes.BookButtonText}>Book it</span></OrderButton>
                <div>
                    <div className={classes.PropertyPrice}>200 DKK<span className={classes.PropertyPriceNight}>/ night</span></div>
                    <div className={classes.PropertyPriceTotal}>3000 DKK total</div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails