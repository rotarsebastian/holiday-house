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

const AddEditBottomRight = props => {

   const [ facilities, setFacilities ] = useState([]);

   const handleCheckboxes = facility => {
      const facilityIndex = facilities.indexOf(facility);
      if (facilityIndex >= 0) {
         const newFacilities = [...facilities];
         newFacilities.splice(facilityIndex, 1);
         setFacilities(newFacilities);
         props.setData(newFacilities);
      } else { setFacilities([ ...facilities, facility ])
         props.setData([ ...facilities, facility ]);
      }
   }

   return (
      <React.Fragment>
          <div className={classes.AddEditHouseRightContainer}>
            <div className={classes.AddEditHouseRightBody}>
               <h3 className={classes.FacilitiesTitle}>Facilities</h3>
               <div className={classes.CheckboxBody}>
                  <div className={classes.CheckboxOne}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox color="primary" name="Essentials" 
                        checked={facilities.indexOf('Essentials') >= 0 ? true : false} onChange={() => handleCheckboxes('Essentials')}  />}
                        label="Essentials"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="WiFi"
                        checked={facilities.indexOf('WiFi') >= 0 ? true : false} onChange={() => handleCheckboxes('WiFi')} />}
                        label="WiFi"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Heat"
                        checked={facilities.indexOf('Heat') >= 0 ? true : false} onChange={() => handleCheckboxes('Heat')} />}
                        label="Heat"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Air conditioning"
                        checked={facilities.indexOf('Air conditioning') >= 0 ? true : false} onChange={() => handleCheckboxes('Air conditioning')} />}
                        label="Air conditioning"
                        />
                     </div>
               
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Parking"
                        checked={facilities.indexOf('Parking') >= 0 ? true : false} onChange={() => handleCheckboxes('Parking')} />}
                        label="Parking"
                        />
                     </div>
                  </div>

                  <div className={classes.CheckboxTwo}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="TV"
                        checked={facilities.indexOf('TV') >= 0 ? true : false} onChange={() => handleCheckboxes('TV')} />}
                        label="TV"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kitchen"
                        checked={facilities.indexOf('Kitchen') >= 0 ? true : false} onChange={() => handleCheckboxes('Kitchen')} />}
                        label="Kitchen"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Workspace"
                        checked={facilities.indexOf('Workspace') >= 0 ? true : false} onChange={() => handleCheckboxes('Workspace')} />}
                        label="Workspace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Closets"
                        checked={facilities.indexOf('Closets') >= 0 ? true : false} onChange={() => handleCheckboxes('Closets')} />}
                        label="Closet/Drawers"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kid-friendly"
                        checked={facilities.indexOf('Kid-friendly') >= 0 ? true : false} onChange={() => handleCheckboxes('Kid-friendly')} />}
                        label="Kid-friendly"
                        />
                     </div>
                  </div>
                  <div className={classes.CheckboxThree}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Shampoo"
                        checked={facilities.indexOf('Shampoo') >= 0 ? true : false} onChange={() => handleCheckboxes('Shampoo')} />}
                        label="Shampoo"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Iron"
                        checked={facilities.indexOf('Iron') >= 0 ? true : false} onChange={() => handleCheckboxes('Iron')} />}
                        label="Iron"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Fireplace"
                        checked={facilities.indexOf('Fireplace') >= 0 ? true : false} onChange={() => handleCheckboxes('Fireplace')} />}
                        label="Fireplace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Hair dryer"
                        checked={facilities.indexOf('Hair dryer') >= 0 ? true : false} onChange={() => handleCheckboxes('Hair dryer')} />}
                        label="Hair dryer"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Breakfast"
                        checked={facilities.indexOf('Breakfast') >= 0 ? true : false} onChange={() => handleCheckboxes('Breakfasts')} />}
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