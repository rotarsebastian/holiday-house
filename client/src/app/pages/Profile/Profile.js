import React, { useEffect, useState } from "react";
import classes from './Profile.module.css';
import ProfileCard from './../../components/ProfileCard/ProfileCard'
import PropertyCard from './../../components/PropertyCard/PropertyCard'
import ReservationCard from  './../../components/ReservationCard/ReservationCard'
import { getUserProperties, deleteProperty }  from './../../helpers/properties';
import { getUserReservations, deleteReservation, editReservation} from './../../helpers/reservations'
import { useStoreValue, useStore } from 'react-context-hook';
import { useHistory } from 'react-router-dom';
import toastr from 'toastr';
import ClipLoader from 'react-spinners/ClipLoader';

const Profile = () => {
    const history = useHistory();
    const user_data = useStoreValue('user');
    const [ properties, setProperties ] = useState(undefined);
    const [ reservations, setReservations ] = useState(undefined);
    const [ showPage, setShowPage ] = useState('0');    

    const [ countLoadedImages, setCountLoadedImages ] = useStore('countLoadedImages');

    useEffect(() => {
        document.querySelector('body').classList.add('profile');
        const fetchData = async() => {
            if(user_data) {
                const properties = await getUserProperties(user_data.id, 0);
                const reservations = await getUserReservations(0);

                setProperties(properties.data);
                setReservations(reservations.data);
            }
        }

        fetchData();
    }, [user_data])

    const openPropertyPage = id => history.push(`/property/${id}`);

    const handleDeleteProperty = async(id) => {

        const result = await deleteProperty(id);
        if(result.status === 1) {
            const newProperties = [...properties];
            const indexDeleted = newProperties.findIndex(property => property.id === id);
            newProperties.splice(indexDeleted, 1);
            setProperties(newProperties);
            toastr.success('Property deleted successfully!');
        }  
    }
    
    const handleDeleteReservation = async(id) => {
        
        const result = await deleteReservation(id);
        if(result.status === 1) {
            const newReservations = [...reservations];
            const indexDeleted = newReservations.findIndex(reservation => reservation.id === id);
            newReservations.splice(indexDeleted, 1);
            setReservations(newReservations);
            toastr.success('Reservation deleted successfully!');
        }  
    }
    const handleEditReservation = async(id, from, to) => {

        const newReservations = [...reservations];
        const updatedReservation = newReservations.findIndex(el => el.id === id);

        const requestObject = [
            { type: "from_date", "val": from },
            { type: "to_date", "val": to },
            { type: "persons_count", "val": reservations[updatedReservation].persons_count }
        ];

        const result = await editReservation(id, requestObject);
        if(result.status === 1) {
            if(updatedReservation >= 0) {
                const newReservation = { ...newReservations[updatedReservation] };
                newReservation.from_date = from;
                newReservation.to_date = to;
                newReservations[updatedReservation] = newReservation;
                setReservations(newReservations);
                toastr.success('Reservation edited successfully!')
            } 
        } else toastr.error(result.message);
    }

    if(properties === undefined || reservations === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>;

    if(
        showPage !== '1' && 
        properties && 
        reservations && 
        countLoadedImages === properties.length + reservations.length
    ) {
        setTimeout(() => setCountLoadedImages(0), 500); 
        setShowPage('1');
    } 

    return (
        <React.Fragment>
            <div className="loading"><ClipLoader size={50} color={'#E4215B'} loading={showPage === '1' ? false : true}/></div>

            <div className={classes.ProfileContainer} style={{ opacity: showPage }}>
                <div className={classes.ProfileCard}>
                    <ProfileCard user={user_data ? user_data : undefined}/>
                </div>
                <div className={classes.ListsContainer}>
                    <div className={classes.MyPropertiesContainer}>
                        <div className={classes.TitleHistory}>My properties</div>
                        <div className={classes.MyPropertiesList}>
                        { properties.map(property => {
                            return (
                                <div className={classes.PropertyCard} key={property.id}>
                                    <PropertyCard property={property} click={openPropertyPage} from={'Profile'} delete={handleDeleteProperty} />
                                </div>
                            )
                        })}
                        </div>
                    </div>
                    <div className={classes.MyReservationsContainer}>
                        <div className={classes.TitleHistory}>My reservations</div>
                        <div className={classes.MyReservationsList}>
                        { reservations.map(reservation => {
                            return (
                                <div className={classes.ReservationCard} key={reservation.id}>
                                    <ReservationCard reservation={reservation} click={openPropertyPage} delete={handleDeleteReservation} edit={handleEditReservation} />
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile;