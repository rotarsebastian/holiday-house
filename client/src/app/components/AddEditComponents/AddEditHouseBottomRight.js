import React, { useState } from 'react'
import './AddEditComponents.module.css';
import Checkbox from '@material-ui/core/Checkbox'
import classes from './AddEditComponents.module.css';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const AddEditBottomRight = () => {
   return (
      <React.Fragment>
          <div className={classes.AddEditHouseRightContainer}>
            <div className={classes.AddEditHouseRightBody}>
               <h3 className={classes.FacilitiesTitle}>Facilities</h3>
               <div className={classes.CheckboxBody}>
                  <div className={classes.CheckboxLeft}>
                     <div>
                        <FormControlLabel
                        control={<Checkbox color="primary" name="Essentials" />}
                        label="Essentials"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="WiFi" />}
                        label="WiFi"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="TV" />}
                        label="TV"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Heat" />}
                        label="Heat"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Air conditioning" />}
                        label="Air conditioning"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Iron" />}
                        label="Iron"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Shampoo" />}
                        label="Shampoo"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Kitchen" />}
                        label="Kitchen"
                        />
                     </div>
                  </div>

                  <div className={classes.CheckboxRight}>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Kid-friendly" />}
                        label="Kid-friendly"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Parking" />}
                        label="Parking"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Hair dryer" />}
                        label="Hair dryer"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Breakfast" />}
                        label="Breakfast"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Desk/Workspace" />}
                        label="Desk/Workspace"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Fireplace" />}
                        label="Fireplace"
                        />
                     </div>
                     <div>
                        <FormControlLabel
                        control={<Checkbox name="Closet/Drawers" />}
                        label="Closet/Drawers"
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