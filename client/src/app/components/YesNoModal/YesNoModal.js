import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const YesNoModal = (props) => {
  const closeModal = e => {
    e.stopPropagation();
    props.close();
  }

  const [ showPage ] = useState(props.from);

  let modalFor;

  if (showPage === 'Delete profile') modalFor = 'profile';
  else if (showPage === 'Delete reservation') modalFor = 'reservation';
  else if (showPage === 'Delete property') modalFor = 'property';

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={e => closeModal(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete your {modalFor}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your {modalFor}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.sendAnswer(e, "Yes", props.id)} color="primary">
            Yes
          </Button>
          <Button onClick={e => props.sendAnswer(e, "No")} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default YesNoModal;