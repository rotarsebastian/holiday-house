import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import classes from "./PropertyCard.module.css";
import YesNoModal from '../YesNoModal/YesNoModal';
import { useStore } from 'react-context-hook';

const PropertyCard = props => {

    const homeClass = props.from === 'Home' ? ` ${classes.Home}` : '';
    
    const [ showDialog, setShowDialog ] = useState(false);

    const [ countLoadedProperties, setCountLoadedProperties ] = useStore('countLoadedProperties');

    const setImgLoaded = () => setCountLoadedProperties(countLoadedProperties + 1);

    const handleAnswer = (e, answer) => {
        e.stopPropagation();
        console.log(answer)
        setShowDialog(false)
    }

    const openModal = e => {
        e.stopPropagation();
        setShowDialog(true)
        // setShowPage("Profile")
    }

    const goToEditProperty = e => {
        e.stopPropagation();
        console.log('go to edit page');
        // history.push('/')
    }

    const { id, photos, title, type, price, capacity, rooms, beds, bathrooms } = props.property;

    const highlighted = props.highlighted === id ? ` ${classes.Highlighted}` : '';

    return (
        <div className={classes.CardContainer + homeClass + highlighted} onClick={() => props.click(id)} onMouseEnter={() => props.mouseOver(id)} onMouseLeave={() => props.mouseLeave(id, 'stop')}>
            <div className={classes.PropertyImageContainer}>
                <img src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]} onLoad={setImgLoaded} />
            </div>

            <div className={classes.PropertyDetails}>
                <div className={classes.Type}>{type}</div>

                {
                    props.from === 'Profile' 
                    ?
                    <React.Fragment>
                        <span className={classes.Icon} onClick={e => openModal(e)}>
                            <FontAwesomeIcon icon={faTrashAlt} size="2x" /> 
                        </span>
                        <YesNoModal sendAnswer={handleAnswer} open={showDialog} close={() => setShowDialog(!showDialog)} from={'Delete property'}/> 
                    </React.Fragment>  
                    :
                    undefined
                }

                <div className={classes.PropertyTitle}>{title}</div>

                <div className={classes.Parag}>
                    {capacity} { parseInt(capacity) > 1 ? ' guests' : ' guest' } {rooms} { parseInt(rooms) > 1 ? ' rooms' : ' room' } {beds} { parseInt(beds) > 1 ? ' beds' : ' bed' } {bathrooms}  {parseInt(bathrooms) > 1 ? ' baths' : ' bath' }
                </div>

                <div className={classes.Price}>{price} DKK/ night</div>

                {
                    props.from === 'Profile' 
                    ?
                    <button className={classes.Button } onClick={e => goToEditProperty(e)}>Edit</button>
                    :
                    undefined
                }   
            </div>
        </div>
    )
};

export default PropertyCard;
