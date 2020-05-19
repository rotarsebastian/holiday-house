import React from 'react';
import {NavLink} from 'react-router-dom';
import customStyles from './Login.module.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/core/styles';

const EmailTextField = withStyles({
  root: {
      width: '100%',
      marginTop: '10px',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
       '&.Mui-focused fieldset': {
         borderColor: '#E4215B',
       },
       '& label.Mui-focused': {
         color: 'black',
       },
     },
   },
})(TextField);

const PasswordTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
       '&.Mui-focused fieldset': {
         border: '2px solid #E4215B',
       },
       '& label.Mui-focused': {
         color: 'black',
       },
     },
   },
 })(TextField);

const LoginButton = withStyles({
   root: {
      width: '100%',
      height: '56px',
      marginTop: '20px',
      marginBottom: '20px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '17px',
      backgroundColor: '#E4215B',
      boxShadow: 'none',
      '&:hover': {
         boxShadow: 'none',
         backgroundColor: '#f02551'
      },
      textTransform: 'none'
   }
})(Button);



const LoginModal = () => {

   const [open, setOpen] = React.useState(false);

   const handleOpen = () => { 
      setOpen(true);
   };
   
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <div>
         <button type="button" onClick={handleOpen}>
         Open Modal
         </button>
         <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         >
         <div className={customStyles.modalContainer}>
            <div className={customStyles.titleContainer}>
               <div className={customStyles.closeButton}><FontAwesomeIcon icon={faTimes}/></div>
               <div className={customStyles.loginTitle}>
                  <p>Log in</p>
               </div>
            </div>
            <form className={customStyles.loginForm} noValidate autoComplete="off">
                  <div>
                     <EmailTextField id="outlined-email-input" label="Email" type="email" 
                     autoComplete="current-email" variant="outlined"/>
                  </div>
                  <div>
                     <PasswordTextField id="outlined-password-input" label="Password" type="password" 
                     autoComplete="current-password" variant="outlined"/>
                  </div>
                  <div>
                     <LoginButton variant="contained">Log in</LoginButton>
                  </div>
                  <div className="modalBottom">
                     <div><NavLink to="/login">Forgotten password?</NavLink></div> 
                     <div>Don't have an account? <NavLink to="/login">Sign up</NavLink></div> 
                  </div>
            </form>
         </div>
         </Modal>
      </div>
   );
};
      
   

   export default LoginModal;
