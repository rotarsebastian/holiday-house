import React, { useEffect, useState }  from "react";
import classes from "./ProfileCard.module.css";
import UserIcon from '../../assets/img/user_icon.svg';
import YesNoModal from '../YesNoModal/YesNoModal';
import ClipLoader from 'react-spinners/ClipLoader';
import { deleteUser } from './../../helpers/auth';
import { useSetStoreValue, useSetAndDelete } from 'react-context-hook';
import { useHistory } from 'react-router-dom';


const ProfileCard = (props) => {
   const [setIsAuthenticated] = useSetAndDelete('isAuthenticated');
   const setUser = useSetStoreValue('user');
   const history = useHistory();

   const [user_data, setUserData] = useState(undefined);
   const [birthdate, setUserBirthdate] = useState(undefined);
   const [created_at, setCreatedAt] = useState(undefined);
   const [showDialog, setShowDialog] = useState(false);
   // const [ showPage, setShowPage ] = useState(props.from);

   useEffect(() => {
      if(props.user) {
         const birthday = props.user.birthdate;
         const birthdate = `${birthday.split('-')[2].slice(0, -14)}/${birthday.split('-')[1]}/${birthday.split('-')[0]}`;
         const created_at =  props.user.created_at;
         const newCreatedAt = created_at.slice(0, -20);
         setUserBirthdate(birthdate);
         setCreatedAt(newCreatedAt);
         setUserData(props.user);
      } 
         
   }, [props])

   const handleAnswer = async(e, answer) => {
      e.stopPropagation();
      setShowDialog(false);

      if(answer === 'Yes'){
         const result = await deleteUser();
         if(result.status === 1) {
            history.push('/');
            setIsAuthenticated(false);
            setUser(undefined);
         }  
      }
  }

   const openModal = e => {
      e.stopPropagation();
      setShowDialog(true)
  }

  if(user_data === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>

   return (
      <div className={classes.CardContainer}>
         <div className={classes.UserTitle}>
            <div className={classes.UserTitle}>
               <div className={classes.User}>
                  <img className={classes.UserIcon} src={UserIcon} alt="user-icon"/>
                  <div className={classes.UserName}>
                     <div className={classes.ProfileTitle}>Hi, I’m {user_data.first_name}</div>
                     <div className={classes.ProfileParag}>Joined in {created_at}</div> 
                  </div>
               </div>
               <span></span>
            </div>
            <span></span>
        </div>
        
        <div className={classes.ProfileDetails}> 
            <div className={classes.UserDetails}>
               <div className={classes.ProfileParag}><span>First name</span><span>{ user_data.first_name}</span></div>
                  <div className={classes.ProfileParag}><span>Last name</span><span>{ user_data.last_name}</span></div>
                  <div className={classes.ProfileParag}><span>Birthday</span><span>{ birthdate }</span></div>
            </div>    
            <div className={classes.EmailDetails}>
               <div className={classes.ProfileEmail}><div>Email</div><div>{ user_data.email }</div> </div>
               <button className={classes.DeleteProfileButton} onClick={e => openModal(e)}>DELETE PROFILE</button>  
               <YesNoModal 
                  id={user_data.id} 
                  sendAnswer={handleAnswer} 
                  open={showDialog} 
                  close={() => setShowDialog(!showDialog)} 
                  from={'Delete profile'}
               /> 
            </div> 
        </div> 
        
      </div>
   )
};

export default ProfileCard;
