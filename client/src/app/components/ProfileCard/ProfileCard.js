import React, { useEffect, useState }  from "react";
import classes from "./ProfileCard.module.css";
import UserIcon from '../../assets/img/user_icon.svg';

const ProfileCard = (props) => {

   const [user_data, setUserData] = useState(undefined);
   const [birthdate, setUserBirthdate] = useState(undefined);
   const [created_at, setCreatedAt] = useState(undefined);



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

   return (
       <div className={classes.CardContainer}>
        <img className={classes.UserIcon} src={UserIcon} alt="user-icon"/>
        <div className={classes.ProfileTitle}>Hi, I’m {user_data ? user_data.first_name : ''  }</div>
        <div className={classes.ProfileParag}>Joined in {user_data ? created_at : ''  }</div>  
        <div className={classes.ProfileDetails}>
         <div className={classes.ProfileParag}><span>First name</span><span>{user_data ? user_data.first_name : ''  }</span></div>
            <div className={classes.ProfileParag}><span>Last name</span><span>{user_data ? user_data.last_name: ''}</span></div>
            <div className={classes.ProfileParag}><span>Birthday</span><span>{user_data ? birthdate : ''  }</span></div>
        </div>    
        <div className={classes.ProfileDetails}>
            <div className={classes.ProfileEmail}><div>Email</div><div>{user_data ? user_data.email : ''  }</div> </div>
        </div>    
</div>
   )
};

export default ProfileCard;
