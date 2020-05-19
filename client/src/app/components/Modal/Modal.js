import React, {useState} from 'react';
import classes from './Modal.module.css';
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
      '&:focused': {
         boxShadow: 'none',
         backgroundColor: 'black'
      },
      '&:active': {
         boxShadow: 'none',
         transition: '0.1s',
         color: 'pink',
         
      },
      textTransform: 'none'
   }
})(Button);

const AuthModal = props => {

   const [showPage, setShowPage] = useState(props.page);
   
   const handleClose = () => props.closeModal();

   let signUpContent, switchModalButtons;

   if (showPage === "Sign up") {
      signUpContent = (
         <React.Fragment>
            <div>
               <EmailTextField id="outlined-email-input" label="First name" type="text" 
               autoComplete="current-email" variant="outlined"/>
            </div>
            <div>
               <EmailTextField id="outlined-email-input" label="Last name" type="text" 
               autoComplete="current-email" variant="outlined"/>
            </div>
               {/* calender */}
            <div>
               <EmailTextField id="outlined-email-input" label="Birthdate" type="text" 
               autoComplete="current-email" variant="outlined"/> 
            </div>
         </React.Fragment>
      );

      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Already have an account? Log in</div> 
         </div>
      )
   } else if (showPage === "Log in") {
      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Recover password")}>Forgotten password?</div> 
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Sign up")}>Don't have an account? Sign up</div> 
         </div>
      )
   } else if (showPage === "Recover password") {
      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Remember your password? Log in</div> 
         </div>
      )
   }



   return (
      <React.Fragment>
         <Modal
         open={true}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         >
         <div className={classes.modalContainer}>
            <div className={classes.titleContainer}>
               <div onClick={handleClose} className={classes.closeButton}><FontAwesomeIcon icon={faTimes}/></div>
               <div className={classes.loginTitle}>
                  <p>{showPage}</p>
               </div>
            </div>
            <div className={classes.FormContainer}>
               <form className={classes.loginForm} noValidate autoComplete="off">
                  {
                     signUpContent ? signUpContent : undefined
                  }
                  <div>
                     <EmailTextField id="outlined-email-input" label="Email" type="email" 
                     autoComplete="current-email" variant="outlined"/>
                  </div>
                  <div>
                     <PasswordTextField id="outlined-password-input" label="Password" type="password" 
                     autoComplete="current-password" variant="outlined"/>
                  </div>
                  {
                     showPage === "Sign up" ? 
                        <div>
                           <EmailTextField id="outlined-email-input" label="First name" type="text" 
                           autoComplete="current-email" variant="outlined"/>
                        </div>
                        : undefined
                  }
                  <div>
                     <LoginButton variant="contained">{showPage}</LoginButton>
                  </div>

                  {
                     switchModalButtons ? switchModalButtons : undefined
                  }
               </form>
            </div>
            
         </div>
         </Modal>
      </React.Fragment>
   );
};
      
   

export default AuthModal;
