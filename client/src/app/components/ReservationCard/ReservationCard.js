import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import classes from "./ReservationCard.module.css";
import YesNoModal from '../YesNoModal/YesNoModal';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';

const PropertyCard = (props) => {
    const [ showDialog, setShowDialog ] = useState(false);
    const [ from, setFrom ] = useState();
    const [ to, setTo ] = useState();
    const [ minDateTo, setMinDateTo ] = useState(moment().add(1, 'days').format('yyyy-MM-DD'));

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
     
        if (label === "From") {
           setFrom(date);
           if(moment(to).isBefore(date, 'day')) setTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
           setMinDateTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
        }
        else setTo(date);
     };
    // const goToEditProperty = e => {
    //     e.stopPropagation();
    //     console.log('go to edit page');
    // }

    const { id, type, title, from_date, to_date } = props.reservation;

    return (
        <div className={classes.CardContainer}>
            <div className={classes.PropertyImageContainer}>
                {/* <img src={'https://holidayhouse1.s3.amazonaws.com/' + photos[0] } className={classes.PropertyImage} alt={photos[0]}  /> */}
            </div>

            <div className={classes.PropertyDetails}>
                <div className={classes.Type}>{type}</div>
                    
                    <React.Fragment>
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
                    </React.Fragment>  

            <div className={classes.PropertyTitle}>{title}</div>
            <div className={classes.Datepicker}>
                <div>
                  <Datepicker 
                     newLabel="From" 
                     handleChange={changeDate}
                     minDate={moment().format('yyyy-MM-DD')}
                     date={from_date}
                   />
               </div>   
               <div>
                  <Datepicker 
                     newLabel="To"
                     handleChange={changeDate}
                     minDate={minDateTo}
                     date={to_date}
               />
               </div> 
            </div>

                 
            </div>
        </div>
    )
};

export default PropertyCard;
