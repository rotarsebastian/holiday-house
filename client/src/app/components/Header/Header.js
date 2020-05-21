import React from 'react';
import classes from './Header.module.css';
import { NavLink, useHistory } from 'react-router-dom';
import Logo from '../../assets/img/holiday_house_logo.svg';
import UserIcon from '../../assets/img/user_icon.svg';
import Modal from '../Modal/Modal';
import { useStore, useSetStoreValue } from 'react-context-hook';
import { logout } from '../../helpers/auth';

const Header = props => {

    const history = useHistory();

    const [isAuthenticated, setIsAuthenticated] = useStore('isAuthenticated');
    const [showModal, setShowModal] = useStore('showModal');
    const setUser = useSetStoreValue('user');

    const setModal = modalName => setShowModal(modalName);
    const closeModal = () => setShowModal(undefined);

    const handleLogout = async() => {
        const res = await logout();
        if(res.status === 1) {
            history.push('/');
            setIsAuthenticated(false);
            setUser(undefined);
        }
    }

    let modalToShow;

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

                    { !isAuthenticated ?

                    <React.Fragment>
                        <span className={classes.Button} onClick={() => setModal("Log in")}>Log in</span> 
                        <span className={classes.SignupButton} onClick={() => setModal("Sign up")}>Sign up</span> 
                    </React.Fragment>

                    :                    

                    <React.Fragment>
                        <span className={classes.Button} onClick={handleLogout}>Log out</span> 
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