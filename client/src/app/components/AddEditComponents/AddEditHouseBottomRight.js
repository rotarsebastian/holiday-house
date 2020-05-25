import React, { useState } from 'react'
import './AddEditComponents.module.css';
import Checkbox from '@material-ui/core/Checkbox'
import classes from './AddEditComponents.module.css';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const StyledFormControlLabel = withStyles({
   root: {
      '& .MuiFormControlLabel-label': {
         fontFamily: 'Quicksand Medium',
         marginLeft: '1vw',
         fontSize: '1rem',
      },
   },
})(FormControlLabel);

const AddEditBottomRight = () => {
   return (
      <React.Fragment>
          <div className={classes.AddEditHouseRightContainer}>
            <div className={classes.AddEditHouseRightBody}>
               <h3 className={classes.FacilitiesTitle}>Facilities</h3>
               <div className={classes.CheckboxBody}>
                  <div className={classes.CheckboxOne}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox color="primary" name="Essentials" />}
                        label="Essentials"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="WiFi" />}
                        label="WiFi"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Heat" />}
                        label="Heat"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Air conditioning" />}
                        label="Air conditioning"
                        />
                     </div>
               
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Parking" />}
                        label="Parking"
                        />
                     </div>
                  </div>

                  <div className={classes.CheckboxTwo}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="TV" />}
                        label="TV"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kitchen" />}
                        label="Kitchen"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Workspace" />}
                        label="Workspace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Closets" />}
                        label="Closet/Drawers"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kid-friendly" />}
                        label="Kid-friendly"
                        />
                     </div>
                  </div>
                  <div className={classes.CheckboxThree}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Shampoo" />}
                        label="Shampoo"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Iron" />}
                        label="Iron"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Fireplace" />}
                        label="Fireplace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Hair dryer" />}
                        label="Hair dryer"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Breakfast" />}
                        label="Breakfast"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default AddEditBottomRight