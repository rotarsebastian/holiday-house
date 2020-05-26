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

    const handleAnswer = (e, answer, id) => {
        e.stopPropagation();
        console.log(answer)
        if(answer === 'Yes') props.delete(id)
        setShowDialog(false)
    }

    const openModal = e => {
        e.stopPropagation();
        setShowDialog(true)
    }

    const goToEditProperty = e => {
        e.stopPropagation();
        console.log('go to edit page');
    }

    const mouseEnterCard = () => {
        if(props.mouseOver) props.mouseOver(id)
    }

    const mouseLeaveCard = () => {
        if(props.mouseLeave) props.mouseLeave(id, 'stop')
    }

    const { id, photos, title, type, price, capacity, rooms, beds, bathrooms } = props.property;

    const highlighted = props.highlighted === id ? ` ${classes.Highlighted}` : '';

    return (
        <div className={classes.CardContainer + homeClass + highlighted} onClick={() => props.click(id)} onMouseEnter={mouseEnterCard} onMouseLeave={mouseLeaveCard}>
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
                        <YesNoModal 
                            sendAnswer={handleAnswer} 
                            id={id}
                            open={showDialog} 
                            close={() => setShowDialog(!showDialog)} 
                            from={'Delete property'}  
                        /> 
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
