import React, {useState} from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/img/holiday_house_logo.svg';
import UserIcon from '../../assets/img/user_icon.svg';
import Modal from '../Modal/Modal';

const Header = props => {

    const [showModal, setShowModal] = useState(undefined);

    const setModal = (modalName) => setShowModal(modalName);

    let modalToShow;

    const closeModal = () => setShowModal(undefined);

    if (showModal) modalToShow = <Modal page={showModal} closeModal={closeModal} />;

    return (
        <React.Fragment>
            <div className={classes.HeaderContainer}>

                <div className={classes.NavbarLeft}>
                    <NavLink exact to="/" activeClassName={classes.active}>
                        <img className={classes.Logo} src={Logo} alt="logo" />
                    </NavLink>
                </div>
                
                <div className={classes.NavbarRight}>
                    <NavLink exact to="/addproperty" activeClassName={classes.active}>
                        <span className={classes.Button}>Host your home</span> 
                    </NavLink>

                    { true ?

                    <React.Fragment>
                        <span className={classes.Button} onClick={() => setModal("Log in")}>Log in</span> 
                        <span className={classes.SignupButton} onClick={() => setModal("Sign up")}>Sign up</span> 
                    </React.Fragment>

                    :                    

                    <React.Fragment>
                        <span className={classes.Button}>Log out</span> 
                        <span className={classes.ProfileButton}>Sebastian<img src={UserIcon} alt="user-icon" /></span> 
                    </React.Fragment>

                    }
                </div>

            </div>
            {
                modalToShow ? modalToShow : undefined
            }
        </React.Fragment>
    )
}

export default Header;