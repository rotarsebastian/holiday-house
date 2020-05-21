import React, { useState } from 'react';
import classes from './Modal.module.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import { login } from '../../helpers/auth';
import { validateForm } from '../../helpers/validation';
import { useStore, useSetStoreValue, useSetAndDelete } from 'react-context-hook';
import toastr from 'toastr';
import '../../styles/toastr.css';
import { useHistory } from 'react-router-dom';

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

const SubmitButton = withStyles({
   root: {
      width: '100%',
      height: '56px',
      marginTop: '20px',
      marginBottom: '20px',
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
      '& .MuiButton-label': {
        color: 'white' 
      },
      textTransform: 'none'
   }
})(Button);

const AuthModal = props => {

   const history = useHistory();

   const [redirectTo, setRedirectTo] = useStore('redirectTo');
   const [setIsAuthenticated] = useSetAndDelete('isAuthenticated');
   const setUser = useSetStoreValue('user');

   const [ showPage, setShowPage ] = useState(props.page);
   const [ user_email, setEmail ] = useState('antonel.costescu@gmail.com');
   const [ user_password, setPassword ] = useState('123123');


   
   const handleClose = () => props.closeModal();

   let signUpContent, switchModalButtons;

   if (showPage === 'Sign up') {
      signUpContent = (
         <React.Fragment>
            <div>
               <EmailTextField 
                  id="outlined-firstname-input" 
                  label="First name" type="text" 
                  autoComplete="off" 
                  variant="outlined"
               />
            </div>
            <div>
               <EmailTextField 
                  id="outlined-lastname-input" 
                  label="Last name" 
                  type="text" 
                  autoComplete="off" 
                  variant="outlined"
               />
            </div>
            <Datepicker newLabel="Birthdate" />
         </React.Fragment>
      );

      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Already have an account? Log in</div> 
         </div>
      );
   } 
   
   // ====================== LOGIN ======================
   else if (showPage === "Log in") {
      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Recover password")}>Forgotten password?</div> 
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Sign up")}>Don't have an account? Sign up</div> 
         </div>
      );
   } 
   
   // ====================== RECOVER PASS ======================
   else if (showPage === "Recover password") {
      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Remember your password? Log in</div> 
         </div>
      );
   }

   const submitForm = async() => {
      if(showPage === 'Log in') {

         // ====================== VALIDATION ======================
         const isFormValid = validateForm([ { type: 'email', val: user_email }, { type: 'password', val: user_password } ]);
         if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

         const res = await login({ type: 'email', val: user_email }, { type: 'password', val: user_password });

         if(res.status === 1) {
            toastr.success('You are now logged in!');
            
            setIsAuthenticated(true);
            setUser(res.user);
            
            if(redirectTo !== undefined) {
               const goTo = redirectTo;
               setRedirectTo(undefined);
               history.push(goTo);
            }
            props.closeModal();
         } else return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);
      } else console.log('another page')
   }

   return (
      <React.Fragment>
         <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

            <div className={classes.modalContainer}>
               <div className={classes.titleContainer}>
                  <div onClick={handleClose} className={classes.closeButton}><FontAwesomeIcon icon={faTimes}/></div>
                  <div className={classes.loginTitle}>
                     <p>{showPage}</p>
                  </div>
               </div>
               <div className={classes.FormContainer}>
                  <form className={classes.loginForm} noValidate autoComplete="off">
                     { signUpContent ? signUpContent : undefined }
                     <div>
                        <EmailTextField 
                           id="outlined-email-input" 
                           label="Email" 
                           type="email" 
                           autoComplete="off" 
                           variant="outlined" 
                           value={user_email} 
                           onChange={e => setEmail(e.target.value)} 
                        />
                     </div>
                     {
                        showPage === "Recover password" ? 
                           undefined
                           : 
                           <div>
                              <PasswordTextField 
                                 id="outlined-password-input" 
                                 label="Password" 
                                 type="password" 
                                 autoComplete="current-password" 
                                 variant="outlined" 
                                 value={user_password} 
                                 onChange={e => setPassword(e.target.value)} 
                              />
                           </div>
                     }
                     {
                        showPage === "Sign up" ? 
                           <div>
                              <PasswordTextField 
                                 id="outlined-repassword-input" 
                                 label="Repeat password" 
                                 type="password" 
                                 variant="outlined"
                              />
                           </div>
                           : 
                           undefined
                     }
                        
                     <SubmitButton variant="contained" onClick={() => submitForm()}>{showPage}</SubmitButton>

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
