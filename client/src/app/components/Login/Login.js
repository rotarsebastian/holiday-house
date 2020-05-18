import React from 'react'
// import styles from "./Login.module.css"
import TextField from '@material-ui/core/TextField';
import customStyles from './Login.module.css'
import Modal from '@material-ui/core/Modal';
import {styled} from '@material-ui/core/styles'

const LoginTextField = styled(TextField)({
   width: '100%',
   

})

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
               <div className={customStyles.loginTitle}>
                  <p>Login</p>
               </div>
            </div>
            <form className={customStyles.loginForm} noValidate autoComplete="off">
               
                  <div>
                  <LoginTextField id="outlined-email-input" label="Email" type="email" 
                  autoComplete="current-email" variant="outlined"/>
                  </div>
                  <div>
                  <LoginTextField id="outlined-password-input" label="Password" type="password" 
                  autoComplete="current-password" variant="outlined"/>
                  </div>
                  <div>
                     <button>Log in</button>
                  </div>
             
            </form>
         </div>
         </Modal>
      </div>
   )
}
      
   

   export default LoginModal
