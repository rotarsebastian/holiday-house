import React, { useEffect, useState }  from "react";
import classes from "./ProfileCard.module.css";
import UserIcon from '../../assets/img/user_icon.svg';

const ProfileCard = (props) => {

   const [user_data, setUserData] = useState(undefined);
   const [birthdate, setUserBirthdate] = useState(undefined);


   useEffect(() => {
      if(props.user) {
         const birthday = props.user.birthdate
         const newBirthdate = birthday.slice(0, -14)
         const birthdate = newBirthdate.split('-')[2] +"/"+ newBirthdate.split('-')[1] +"/"+ newBirthdate.split('-')[0]
         setUserData(props.user);
         setUserBirthdate(birthdate);
      } 
         
   }, [props])

   return (
       <div className={classes.CardContainer}>
        <img className={classes.UserIcon} src={UserIcon} alt="user-icon"/>
        <div className={classes.ProfileTitle}>Hi, I’m {user_data ? user_data.first_name : ''  }</div>
        <div className={classes.ProfileParag}>Joined in 2020</div>  
        <div className={classes.ProfileDetails}>
         <div className={classes.ProfileParag}><span>First name</span><span>{user_data ? user_data.first_name : ''  }</span></div>
            <div className={classes.ProfileParag}><span>Last name</span><span>{user_data ? user_data.last_name: ''}</span></div>
            <div className={classes.ProfileParag}><span>Birthday</span><span>{user_data ? birthdate : ''  }</span></div>
        </div>    
        <div className={classes.ProfileDetails}>
            <div className={classes.ProfileParag}><span>Email</span> <span>{user_data ? user_data.email : ''  }</span> </div>
            <div className={classes.ProfileParag}><span>Password</span> <span>Password</span> </div>
        </div>    
</div>
   )
};

export default ProfileCard;
