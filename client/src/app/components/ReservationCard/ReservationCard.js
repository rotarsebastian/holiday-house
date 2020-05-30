import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import classes from "./ReservationCard.module.css";
import YesNoModal from '../YesNoModal/YesNoModal';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';
import { useStore } from 'react-context-hook';

const ReservationCard = (props) => {
    const { id, type, title, photos, price, from_date, to_date } = props.reservation;
    const daysReserved = moment(to_date).diff(moment(from_date), 'days');
    const totalPrice = price * daysReserved;

    const [ buttonIsDisabled, setButtonIsDisabled ] = useState(true);
    const [ showDialog, setShowDialog ] = useState(false);
    const [ from, setFrom ] = useState(moment(from_date).format('yyyy-MM-DD'));
    const [ to, setTo ] = useState(moment(to_date).format('yyyy-MM-DD'));
    const [ minDateTo, setMinDateTo ] = useState(moment(from_date).add(1, 'days').format('yyyy-MM-DD'));

    const [ countLoadedImages, setCountLoadedImages ] = useStore('countLoadedImages');

    const setImgLoaded = () => setCountLoadedImages(countLoadedImages + 1);

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

    const changeDate = (newDate, label) => {
        const date = moment(newDate).format('yyyy-MM-DD');
        setButtonIsDisabled(false);
     
        if (label === 'From') {
           setFrom(date);
           if(moment(to).isSameOrBefore(date, 'day')) setTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
           setMinDateTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
        } else setTo(date);
    };

    const saveChanges = e => {
        e.stopPropagation();
        setButtonIsDisabled(true);
        props.edit(id, from, to);
    }

    return (
        <div className={classes.CardContainer}>
            <div className={classes.PropertyImageContainer}>
                <img src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]} onLoad={setImgLoaded} />
            </div>

            <div className={classes.PropertyDetails}>
                <div className={classes.Type}>{type}</div>
                    <span className={classes.Icon} onClick={e => openModal(e)}>
                        <FontAwesomeIcon icon={faTrashAlt} size="2x" /> 
                    </span>
                    <YesNoModal 
                        sendAnswer={handleAnswer} 
                        id={id}
                        open={showDialog} 
                        close={() => setShowDialog(!showDialog)} 
                        from={'Delete reservation'}  
                    /> 
            <div className={classes.PropertyTitle}>{title}</div>
            <div className={classes.Datepicker}>
                <div className={classes.DatepickerContainer}>
                  <Datepicker
                    id={id} 
                    newLabel='From' 
                    handleChange={changeDate}
                    date={from}
                    from={'Reservation card'}
                   />
               </div>   
               <div className={classes.DatepickerContainer}>
                  <Datepicker 
                    id={id} 
                    newLabel='To'
                    handleChange={changeDate}
                    minDate={minDateTo}
                    date={to}
                    from={'Reservation card'}
               />
               </div> 
            </div>
            <div className={classes.Price}>Total: {totalPrice} DKK</div>
            <button 
                disabled={buttonIsDisabled} 
                className={`${classes.Button} ${buttonIsDisabled ? classes.Disabled : ''}`}
                onClick={e => saveChanges(e)}
                >
                    Save
            </button>
                 
            </div>
        </div>
    )
};

export default ReservationCard;
