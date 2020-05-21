import React  from "react";
import classes from "./ProfileCard.module.css";
import UserIcon from '../../assets/img/user_icon.svg';

const ProfileCard = (user) => {
//    const [first_name, last_name] = user;
    
    // console.log(user)
    
   return (
       <div className={classes.CardContainer}>
        <img className={classes.UserIcon} src={UserIcon} alt="user-icon"/>
        <div className={classes.ProfileTitle}>Hi, I’m Andreea</div>
        <div className={classes.ProfileParag}>Joined in 2020</div>  
        <div className={classes.ProfileDetails}>
   <div className={classes.ProfileParag}><span>Andreea</span><span>Steriu</span></div>
            <div className={classes.ProfileParag}><span>Last name</span><span>Steriu</span></div>
            <div className={classes.ProfileParag}><span>Birthday</span><span>16/11/95</span></div>
        </div>    
        <div className={classes.ProfileDetails}>
            <div className={classes.ProfileParag}><span>Email</span> <span>a@a.com</span> </div>
            <div className={classes.ProfileParag}><span>Password</span> <span>Password</span> </div>
        </div>    
</div>
   )
};

export default ProfileCard;
