import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// const [showDialog, setShowDialog] = useState(false);

// const handleAnswer = answer => {
//   console.log(answer)
//   setShowDialog(false)
// }

{/* <button variant="outlined" color="primary" onClick={() => setShowDialog(true)}>
  Delete your profile
</button>
<YesNoModal sendAnswer={handleAnswer} open={showDialog} close={() => setShowDialog(!showDialog)} /> */}

const YesNoModal = (props) => {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
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
          <Button onClick={() => props.sendAnswer("Yes")} color="primary">
            Yes
          </Button>
          <Button onClick={() => props.sendAnswer("No")} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default YesNoModal;