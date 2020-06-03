import React, { useState } from 'react';
import classes from './Modal.module.css';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import { login, register, recoverOrResendValidation, changePassword } from '../../helpers/auth';
import { validateForm } from '../../helpers/validation';
import { useStore, useSetStoreValue, useSetAndDelete } from 'react-context-hook';
import toastr from 'toastr';
import '../../styles/toastr.css';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import ClipLoader from 'react-spinners/ClipLoader'

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

   const [ key, setChangeKey ] = useStore('changeKey');
   const [ redirectTo, setRedirectTo ] = useStore('redirectTo');
   const [ setIsAuthenticated ] = useSetAndDelete('isAuthenticated');
   const setUser = useSetStoreValue('user');

   const [ showPage, setShowPage ] = useState(props.page);
   const [ loadingButton, setLoadingButton ] = useState(false);

   const [ user_first_name, setFirstName ] = useState('');
   const [ user_last_name, setLastName ] = useState('');
   const [ user_birthdate, setBirthdate ] = useState(moment('1999-01-25').format('yyyy-MM-DD'));
   const [ user_email, setEmail ] = useState('');
   const [ user_password, setPassword ] = useState('');
   const [ user_rePassword, setRepassword ] = useState('');

   const changeDate = newDate => {
      const date = moment(newDate).format('yyyy-MM-DD'); 
      setBirthdate(date);
   };
   
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
                  value={user_first_name} 
                  onChange={e => setFirstName(e.target.value)} 
               />
            </div>
            <div>
               <EmailTextField 
                  id="outlined-lastname-input" 
                  label="Last name" 
                  type="text" 
                  autoComplete="off" 
                  variant="outlined"
                  value={user_last_name} 
                  onChange={e => setLastName(e.target.value)} 
               />
            </div>
            <Datepicker 
               date={user_birthdate} 
               newLabel="Birthdate" 
               page="Sign up" 
               handleChange={changeDate} 
            />
         </React.Fragment>
      );

      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Already have an account? Log in</div> 
         </div>
      );
   } 
   
   // ====================== LOGIN ======================
   else if (showPage === 'Log in') {
      switchModalButtons =  (
         <div className='modalBottom'>
            <div className={classes.SwitchPageButton} onClick={() => setShowPage('Recover password')}>Forgotten password?</div> 
            <div className={classes.SwitchPageButton} onClick={() => setShowPage('Sign up')}>Don't have an account? Sign up</div> 
         </div>
      );
   } 
   
   // ====================== RECOVER PASS ======================
   else if (showPage === 'Recover password') {
      switchModalButtons =  (
         <div className='modalBottom'>
            <div className={classes.SwitchPageButton} onClick={() => setShowPage('Log in')}>Remember your password? Log in</div> 
         </div>
      );
   }

   // ====================== CHANGE PASS ======================
   else if (showPage === 'Change password') {
      switchModalButtons =  (
         <div className="modalBottom">
            <div className={classes.SwitchPageButton} onClick={() => setShowPage("Log in")}>Remember your password? Log in</div> 
         </div>
      );
   }

   const submitForm = async() => {
      // ====================== LOGIN ======================
      if(showPage === 'Log in') {

         // ====================== VALIDATION ======================
         const loginData = [ { type: 'email', val: user_email }, { type: 'password', val: user_password } ];
         const isFormValid = validateForm(loginData);
         if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

         setLoadingButton(true);
         const res = await login(loginData);
         setLoadingButton(false);

         // ====================== RESPONSE ======================
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
         } else return toastr.error(res.message); 
      } 
      
      // ====================== SIGNUP ======================
      else if(showPage === 'Sign up') {

         if(user_password !== user_rePassword) return toastr.error('Passwords do not match!');

         // ====================== VALIDATION ======================
         const signUpData = [ 
            { type: 'first_name', val: user_first_name }, 
            { type: 'last_name', val: user_last_name }, 
            { type: 'birthdate', val: user_birthdate }, 
            { type: 'email', val: user_email }, 
            { type: 'password', val: user_password }, 
            { type: 'password', val: user_rePassword }, 
         ];

         const isFormValid = validateForm(signUpData);
         if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

         setLoadingButton(true);
         const res = await register(signUpData);
         setLoadingButton(false);

         // ====================== RESPONSE ======================
         if(res.status === 1) {
            toastr.success('Follow the email instructions to validate your account', 'Your account is now created!');
            
            setRedirectTo(undefined);
            props.closeModal();
         } else return toastr.error(res.message);

      } 
      
      // ====================== RECOVER PASSWORD ======================
      else if(showPage === 'Recover password') {

         // ====================== VALIDATION ======================
         const resetPassData = [ { type: 'email', val: user_email }];

         const isFormValid = validateForm(resetPassData);
         if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

         setLoadingButton(true);
         const res = await recoverOrResendValidation(resetPassData);
         setLoadingButton(false);

         // ====================== RESPONSE ======================
         if(res.status === 1) {
            toastr.success('Follow the email instructions to complete this action', 'Email was sent successfully!');
            
            setRedirectTo(undefined);
            props.closeModal();
         } else return toastr.error(res.message);
 
      } 

      // ====================== CHANGE PASSWORD ======================
      else if(showPage === 'Change password') {

         if(user_password !== user_rePassword) return toastr.error('Passwords do not match!');

         // ====================== VALIDATION ======================
         const changePassData = [
            { type: 'password', val: user_password }, 
            { type: 'password', val: user_rePassword },
         ];

         const isFormValid = validateForm(changePassData);
         if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

         if(key) changePassData.push({ key });
            else return toastr.error('Unauthorized!');

         setLoadingButton(true);
         const res = await changePassword(changePassData);
         setChangeKey(undefined);
         setLoadingButton(false);

         // ====================== RESPONSE ======================
         if(res.status === 1) {
            toastr.success('You can now login into your account', 'Your password was changed successfully!');
            
            setRedirectTo(undefined);
            setPassword('');
            setShowPage('Log in');
         } else return toastr.error(res.message);
      }
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
                     {
                        showPage === 'Sign up' || 
                        showPage === 'Log in' ||  
                        showPage === 'Recover password'  
                        ? 
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
                        : 
                        undefined
                     }  
                     
                     {
                        showPage === "Sign up" || 
                        showPage === "Log in" || 
                        showPage === 'Change password' 
                        ? 
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
                           :
                           undefined
                     }
                     {
                        showPage === "Sign up" || showPage === 'Change password' ? 
                           <div>
                              <PasswordTextField 
                                 id="outlined-repassword-input" 
                                 label="Repeat password" 
                                 type="password" 
                                 variant="outlined"
                                 value={user_rePassword} 
                                 onChange={e => setRepassword(e.target.value)} 
                              />
                           </div>
                           : 
                           undefined
                     }
                        
                     <SubmitButton variant="contained" onClick={() => submitForm()}>
                        {
                           loadingButton 
                           ?
                           <ClipLoader size={18} color={'#fff'} /> 
                           :
                           showPage
                        }
                     </SubmitButton>

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
