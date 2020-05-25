import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {deleteProperty} from '../../helpers/properties'

// const [showDialog, setShowDialog] = useState(false);

// const handleAnswer = answer => {
//   console.log(answer)
//   setShowDialog(false)
// }

/* <button variant="outlined" color="primary" onClick={() => setShowDialog(true)}>
  Delete your profile
</button>
<YesNoModal sendAnswer={handleAnswer} open={showDialog} close={() => setShowDialog(!showDialog)} /> */

const YesNoModal = (props) => {
  const closeModal = e => {
    e.stopPropagation();
    props.close();
  }

  
  // const deleteSpecificProperty = async(id) => {
  //     if(user_data) {
  //         const properties = await deleteProperty(user_data.id, 0);
  //         // console.log(properties)
  //         setProperties(properties.data);
  //     }
  // }

  const [ showPage, setShowPage ] = useState(props.from);


  if (showPage === 'Delete property') {
    return (
      <div>
        <Dialog
        open={props.open}
        onClose={e => closeModal(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Delete your property"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.sendAnswer(e, "Yes")} color="primary">
            Yes
          </Button>
          <Button onClick={e => props.sendAnswer(e, "No")} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
    
  } 
  if (showPage === 'Delete profile') {
    return(
      <div>
         <Dialog
          open={props.open}
          onClose={e => closeModal(e)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete your profile"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete your profile?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={e => props.sendAnswer(e, "Yes")} color="primary">
              Yes
            </Button>
            <Button onClick={e => props.sendAnswer(e, "No")} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      
    );
  }
  // { const deleteProfile = props.from === 'Profile' ? 
  //   (
  //     <div>
  //       <Dialog
  //         open={props.open}
  //         onClose={e => closeModal(e)}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //       >
  //         <DialogTitle id="alert-dialog-title">{"Delete your property"}</DialogTitle>
  //         <DialogContent>
  //           <DialogContentText id="alert-dialog-description">
  //             Are you sure you want to delete your property?
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={e => props.sendAnswer(e, "Yes")} color="primary">
  //             Yes
  //           </Button>
  //           <Button onClick={e => props.sendAnswer(e, "No")} color="primary" autoFocus>
  //             No
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   ) : (
  //     <div>
  //       <Dialog
  //         open={props.open}
  //         onClose={e => closeModal(e)}
  //         aria-labelledby="alert-dialog-title"
  //         aria-describedby="alert-dialog-description"
  //       >
  //         <DialogTitle id="alert-dialog-title">{"Delete your profile"}</DialogTitle>
  //         <DialogContent>
  //           <DialogContentText id="alert-dialog-description">
  //             Are you sure you want to delete your profile?
  //           </DialogContentText>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={e => props.sendAnswer(e, "Yes")} color="primary">
  //             Yes
  //           </Button>
  //           <Button onClick={e => props.sendAnswer(e, "No")} color="primary" autoFocus>
  //             No
  //           </Button>
  //         </DialogActions>
  //       </Dialog>
  //     </div>
  //   )}
};

export default YesNoModal;