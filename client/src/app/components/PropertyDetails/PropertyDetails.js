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

    const { id, title, description, price, capacity, type, rooms, beds, bathrooms, address } = props.property;

    const capitalize = name => {
        console.log(name)
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
 
    return (
        <div className={classes.PropertyDetailsContainer +" "+id}>
            <div  className={classes.PropertyInfo}>{type ? capitalize(type) : ''}</div>
            <div className={classes.PropertyTitle}>{title ? capitalize(title) : ''}</div>
            <div className={classes.PropertyInfoRooms} >
                {capacity} { parseInt(capacity) > 1 ? ' guests' : ' guest' } {rooms} { parseInt(rooms) > 1 ? ' rooms' : ' room' } {beds} { parseInt(beds) > 1 ? ' beds' : ' bed' } {bathrooms}  {parseInt(bathrooms) > 1 ? ' baths' : ' bath' }
            </div>
            <div className={classes.PropertyDetails}>
                <div className={classes.PropertyDetailTitle}>Description</div>
                <div className={classes.PropertyInfo}>{description ? capitalize(description) : ''}</div>
         
            <div>
                <div  className={classes.PropertyDetailTitle}>Address</div>
                <div className={classes.PropertyInfo}>{address ? capitalize(address.property_address) : ''}, {address ? capitalize(address.city): ''}, {address ? capitalize(address.country) : ''}</div>
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
                    <div className={classes.PropertyPrice}>{price} DKK<span className={classes.PropertyPriceNight}>/ night</span></div>
                    {/* <div className={classes.PropertyPriceTotal}>3000 DKK total</div> */}
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails