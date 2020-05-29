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

   const [ facilities, setFacilities ] = useState(props.populate !== undefined ? props.populate : []);

   const handleCheckboxes = facility => {
      const facilityObject = { name: facility, icon: facility.toLowerCase() };
      const facilityIndex = facilities.findIndex(el => el.name === facility);;
      if (facilityIndex >= 0) {
         const newFacilities = [...facilities];
         newFacilities.splice(facilityIndex, 1);
         setFacilities(newFacilities);
         props.setData(newFacilities);
      } else { setFacilities([ ...facilities, facilityObject ])
         props.setData([ ...facilities, facilityObject ]);
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
                        checked={facilities.findIndex(el => el.name === 'Essentials') >= 0 ? true : false} onChange={() => handleCheckboxes('Essentials')}  />}
                        label="Essentials"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="WiFi"
                        checked={facilities.findIndex(el => el.name === 'WiFi') >= 0 ? true : false} onChange={() => handleCheckboxes('WiFi')} />}
                        label="WiFi"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Heat"
                        checked={facilities.findIndex(el => el.name === 'Heat') >= 0 ? true : false} onChange={() => handleCheckboxes('Heat')} />}
                        label="Heat"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Air conditioning"
                        checked={facilities.findIndex(el => el.name === 'Air conditioning') >= 0 ? true : false} onChange={() => handleCheckboxes('Air conditioning')} />}
                        label="Air conditioning"
                        />
                     </div>
               
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Parking"
                        checked={facilities.findIndex(el => el.name === 'Parking') >= 0 ? true : false} onChange={() => handleCheckboxes('Parking')} />}
                        label="Parking"
                        />
                     </div>
                  </div>

                  <div className={classes.CheckboxTwo}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="TV"
                        checked={facilities.findIndex(el => el.name === 'TV') >= 0 ? true : false} onChange={() => handleCheckboxes('TV')} />}
                        label="TV"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kitchen"
                        checked={facilities.findIndex(el => el.name === 'Kitchen') >= 0 ? true : false} onChange={() => handleCheckboxes('Kitchen')} />}
                        label="Kitchen"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Workspace"
                        checked={facilities.findIndex(el => el.name === 'Workspace') >= 0 ? true : false} onChange={() => handleCheckboxes('Workspace')} />}
                        label="Workspace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Closets"
                        checked={facilities.findIndex(el => el.name === 'Closets') >= 0 ? true : false} onChange={() => handleCheckboxes('Closets')} />}
                        label="Closet/Drawers"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Kid-friendly"
                        checked={facilities.findIndex(el => el.name === 'Kid-friendly') >= 0 ? true : false} onChange={() => handleCheckboxes('Kid-friendly')} />}
                        label="Kid-friendly"
                        />
                     </div>
                  </div>
                  <div className={classes.CheckboxThree}>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Shampoo"
                        checked={facilities.findIndex(el => el.name === 'Shampoo') >= 0 ? true : false} onChange={() => handleCheckboxes('Shampoo')} />}
                        label="Shampoo"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Iron"
                        checked={facilities.findIndex(el => el.name === 'Iron') >= 0 ? true : false} onChange={() => handleCheckboxes('Iron')} />}
                        label="Iron"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Fireplace"
                        checked={facilities.findIndex(el => el.name === 'Fireplace') >= 0 ? true : false} onChange={() => handleCheckboxes('Fireplace')} />}
                        label="Fireplace"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Hair dryer"
                        checked={facilities.findIndex(el => el.name === 'Hair dryer') >= 0 ? true : false} onChange={() => handleCheckboxes('Hair dryer')} />}
                        label="Hair dryer"
                        />
                     </div>
                     <div>
                        <StyledFormControlLabel
                        control={<Checkbox name="Breakfast"
                        checked={facilities.findIndex(el => el.name === 'Breakfast') >= 0 ? true : false} onChange={() => handleCheckboxes('Breakfast')} />}
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