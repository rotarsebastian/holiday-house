import React from "react";
import classes from './Profile.module.css';
import PropertiesList from './../../components/PropertiesList/PropertiesList'
import ProfileCard from './../../components/ProfileCard/ProfileCard'


const Home = props => {
    return (
        <React.Fragment>
            <div className={classes.ProfileContainer}>
                <div className={classes.ProfileCard}>
                <ProfileCard />
                </div>
                <div className={classes.Container}>
                <div className={classes.TitleHistory}>My reservation history</div>
                <PropertiesList/>
            </div>
            </div>
        </React.Fragment>
    )
}

export default Home;