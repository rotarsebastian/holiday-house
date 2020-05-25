import React, { useEffect, useState }  from "react";
import classes from "./ProfileCard.module.css";
import UserIcon from '../../assets/img/user_icon.svg';
import YesNoModal from '../YesNoModal/YesNoModal';

const ProfileCard = (props) => {

   const [user_data, setUserData] = useState(undefined);
   const [birthdate, setUserBirthdate] = useState(undefined);
   const [created_at, setCreatedAt] = useState(undefined);
   const [showDialog, setShowDialog] = useState(false);
   // const [ showPage, setShowPage ] = useState(props.from);



   useEffect(() => {
      if(props.user) {
         const birthday = props.user.birthdate
         const newBirthdate = birthday.slice(0, -14)
         const birthdate = newBirthdate.split('-')[2] +"/"+ newBirthdate.split('-')[1] +"/"+ newBirthdate.split('-')[0]
         const created_at =  props.user.created_at
         const newCreatedAt = created_at.slice(0, -20)
         setUserData(props.user);
         setUserBirthdate(birthdate);
         setCreatedAt(newCreatedAt);
      } 
         
   }, [props])

   const handleAnswer = (e, answer) => {
      e.stopPropagation();
      console.log(answer)
      setShowDialog(false)
  }

   const openModal = e => {
      e.stopPropagation();
      setShowDialog(true)
  }

   return (
      <div className={classes.CardContainer}>
         <div className={classes.UserTitle}>
            <div className={classes.UserTitle}>
               <div className={classes.User}>
                  <img className={classes.UserIcon} src={UserIcon} alt="user-icon"/>
                  <div className={classes.UserName}>
                     <div className={classes.ProfileTitle}>Hi, I’m {user_data ? user_data.first_name : ''  }</div>
                     <div className={classes.ProfileParag}>Joined in {user_data ? created_at : ''  }</div> 
                  </div>
               </div>
               <span></span>
            </div>
            <span></span>
        </div>
        
        <div className={classes.ProfileDetails}> 
            <div className={classes.UserDetails}>
               <div className={classes.ProfileParag}><span>First name</span><span>{user_data ? user_data.first_name : ''  }</span></div>
                  <div className={classes.ProfileParag}><span>Last name</span><span>{user_data ? user_data.last_name: ''}</span></div>
                  <div className={classes.ProfileParag}><span>Birthday</span><span>{user_data ? birthdate : ''  }</span></div>
            </div>    
            <div className={classes.EmailDetails}>
               <div className={classes.ProfileEmail}><div>Email</div><div>{user_data ? user_data.email : ''  }</div> </div>
               <button className={classes.DeleteProfileButton} onClick={e => openModal(e)}>DELETE PROFILE</button>  
               <YesNoModal sendAnswer={handleAnswer} open={showDialog} close={() => setShowDialog(!showDialog)} from={'Delete profile'}/> 
            </div> 
        </div> 
        
      </div>
   )
};

export default ProfileCard;
