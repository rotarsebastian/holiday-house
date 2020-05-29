import React, { useEffect, useState } from 'react';
import classes from './PropertyDetails.module.css'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faCoins } from '@fortawesome/free-solid-svg-icons';
import { useSetAndDelete } from 'react-context-hook';
import { createReservation }  from './../../helpers/reservations';
import { useStoreValue } from 'react-context-hook';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import toastr from 'toastr';

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

    const history = useHistory();
    const location = useLocation();
 
    const [setShowModal] = useSetAndDelete('showModal');
    const user_data = useStoreValue('user');
    
    const [ from, setFrom ] = useState(undefined);
    const [ to, setTo ] = useState(undefined);
    const [ guests, setGuests ] = useState(undefined);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const from_url = searchParams.get('from'); 
        const to_url = searchParams.get('to'); 
        const guests_url = searchParams.get('guests'); 

        if(from_url) setFrom(from_url);
        if(to_url) setTo(to_url);
        if(guests_url) setGuests(guests_url);

    }, [location]); 

    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
    
    const { id, title, price, capacity, type, rooms, beds, bathrooms, address, first_name, last_name, user_id, available_start } = props.property;

    console.log(address)

    const handleCreateBooking = async(id) => {
        if(user_data) {
            if(from && to && guests) {
                const requestData = [
                    { "type": "from_date", "val": from },
                    { "type": "to_date", "val": to },
                    { "type": "persons_count", "val": parseInt(guests) }
                ];
                const response = await createReservation(id, requestData);
                if(response.status === 1){
                    toastr.success('Reservation created successfully!');
                    history.push('/profile');
                } else toastr.error(response.message);
    
            } else {
                history.push(`/propertiesresults?from=${moment(available_start).format('yyyy-MM-DD')}&to=${moment(available_start).add(1, 'days').format('yyyy-MM-DD')}&guests=1&city=${encodeURIComponent(address.city)}`);
            }
        } else setShowModal('Log in');
    }

    let bookButton;

    if(user_data && user_data.id !== user_id) {
        bookButton = (
            <React.Fragment>
                <OrderButton onClick={() => handleCreateBooking(id)}><span className={classes.BookButtonText}>Book it</span></OrderButton>
                <div>
                    <div className={classes.PropertyPrice}>{price} DKK<span className={classes.PropertyPriceNight}> / night</span></div>
                </div>
            </React.Fragment>
        )
    } else if(!user_data) {
        bookButton = (
            <React.Fragment>
                <OrderButton onClick={() => handleCreateBooking(id)}><span className={classes.BookButtonText}>Book it</span></OrderButton>
                <div>
                    <div className={classes.PropertyPrice}>{price} DKK<span className={classes.PropertyPriceNight}> / night</span></div>
                </div>
            </React.Fragment>
        )
    }

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
                { bookButton }
            </div>
        </div>
    )
}

export default PropertyDetails