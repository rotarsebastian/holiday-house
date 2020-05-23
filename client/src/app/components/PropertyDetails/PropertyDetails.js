import React from 'react';
import classes from './PropertyDetails.module.css'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCoins } from '@fortawesome/free-solid-svg-icons';

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

const PropertyDetails = props => {

    const { title, price, capacity, type, rooms, beds, bathrooms, address, first_name, last_name } = props.property;

    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
 
    return (
        <div className={classes.PropertyDetailsContainer}>
            <div  className={classes.PropertyInfo}>{type ? capitalize(type) : ''}</div>
            <div className={classes.PropertyTitle}>{title ? capitalize(title) : ''}</div>

            <div className={classes.PropertyInfoRooms} >
                {capacity} { parseInt(capacity) > 1 ? ' guests' : ' guest' } 
                <span style={{ color: 'var(--grey)', margin: '0 .2rem' }}>&nbsp;&bull;&nbsp;</span>

                {rooms} { parseInt(rooms) > 1 ? ' rooms' : ' room' }
                <span style={{ color: 'var(--grey)', margin: '0 .2rem' }}>&nbsp;&bull;&nbsp;</span>

                {beds} { parseInt(beds) > 1 ? ' beds' : ' bed' }
                <span style={{ color: 'var(--grey)', margin: '0 .2rem' }}>&nbsp;&bull;&nbsp;</span> 
                {bathrooms}  {parseInt(bathrooms) > 1 ? ' baths' : ' bath' }
            </div>

            <div className={classes.PropertyDetails}>
                <div>
                    <div  className={classes.PropertyDetailTitle}>Address</div>
                    <div className={classes.PropertyInfo}>{capitalize(address.property_address)}, {capitalize(address.city)}, {capitalize(address.country)}</div>
                </div>

                <div>
                    <div  className={classes.PropertyDetailTitle}>Hosted by</div>
                    <div className={classes.PropertyInfo}>{first_name} {last_name}</div>
                </div>
            </div>

            <div className={classes.PropertyPriceTotal}>
                <FontAwesomeIcon icon={faCoins} style={{ marginRight: '.75rem' }} />
                Price for {7} nights: 
                <span className={classes.PriceTotalAmount}>{7*999} DKK</span>
            </div>

            <div className={classes.PropertyDiscount}>
                <FontAwesomeIcon icon={faTags} style={{ marginRight: '.5rem' }} />
                Discount for more than {15} nights: 
                <span className={classes.PriceTotalAmount}>{15}%</span>
            </div>

            <div className={classes.PropertyOrderContainer} >
                <OrderButton><span className={classes.BookButtonText}>Book it</span></OrderButton>
                <div>
                    <div className={classes.PropertyPrice}>{price} DKK<span className={classes.PropertyPriceNight}> / night</span></div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails