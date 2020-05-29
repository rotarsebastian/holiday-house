import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import classes from "./ReservationCard.module.css";
import YesNoModal from '../YesNoModal/YesNoModal';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';

const ReservationCard = (props) => {
    const { id, type, title, photos, price, from_date, to_date } = props.reservation;
    const daysReserved = moment(to_date).diff(moment(from_date), 'days');
    const totalPrice = price * daysReserved;

    const [ showDialog, setShowDialog ] = useState(false);
    const [ from, setFrom ] = useState(from_date);
    const [ to, setTo ] = useState(to_date);
    const [ minDateTo, setMinDateTo ] = useState(moment(from_date).add(1, 'days').format('yyyy-MM-DD'));
    const [ disableSameDate, setDisableSameDate ] = useState(moment().subtract(1, 'day').format('yyyy-MM-DD'));

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
     
        if (label === 'From') {
           setFrom(date);
           if(moment(to).isBefore(date, 'day')) setTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
           setMinDateTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
        } else {
            setTo(date);
            setDisableSameDate(moment(date).format('yyyy-MM-DD'));
        } 
    };

    const saveChanges = e => {
        e.stopPropagation();
        props.edit(id, from, to);
    }

    return (
        <div className={classes.CardContainer}>
            <div className={classes.PropertyImageContainer}>
                <img src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]}  />
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
                    disableDay={disableSameDate}
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
            <button className={classes.Button} onClick={e => saveChanges(e)}>Save</button>
                 
            </div>
        </div>
    )
};

export default ReservationCard;
