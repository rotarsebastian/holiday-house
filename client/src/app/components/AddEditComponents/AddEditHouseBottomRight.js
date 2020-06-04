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

const facilitiesColumn1 = ['Essentials', 'WiFi', 'Heat', 'Air conditioning', 'Parking'];
const facilitiesColumn2 = ['TV', 'Kitchen', 'Workspace', 'Closet/Drawers', 'Kid-friendly'];
const facilitiesColumn3 = ['Shampoo', 'Iron', 'Fireplace', 'Hair dryer', 'Breakfast'];

const AddEditBottomRight = props => {

   const [ facilities, setFacilities ] = useState(props.populate !== undefined ? props.populate : []);

   const handleCheckboxes = facility => {
      const facilityObject = { name: `${facility}.svg`, icon: facility.toLowerCase() };
      const facilityIndex = facilities.findIndex(el => el.name === `${facility}.svg`);
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
                     {
                        facilitiesColumn1.map(facility => {
                           return (
                              <div key={facility}>
                                 <StyledFormControlLabel
                                 control={<Checkbox color="primary" name={facility} 
                                 checked={facilities.findIndex(el => el.name === `${facility}.svg`) >= 0 ? true : false} onChange={() => handleCheckboxes(facility)}  />}
                                 label={facility}
                                 />
                              </div>
                           )
                        })
                     }
                  </div>

                  <div className={classes.CheckboxTwo}>
                     {
                        facilitiesColumn2.map(facility => {
                           return (
                              <div key={facility}>
                                 <StyledFormControlLabel
                                 control={<Checkbox color="primary" name={facility} 
                                 checked={facilities.findIndex(el => el.name === `${facility}.svg`) >= 0 ? true : false} onChange={() => handleCheckboxes(facility)}  />}
                                 label={facility}
                                 />
                              </div>
                           )
                        })
                     }
                  </div>

                  <div className={classes.CheckboxThree}>
                     {
                        facilitiesColumn3.map(facility => {
                           return (
                              <div key={facility}>
                                 <StyledFormControlLabel
                                 control={<Checkbox color="primary" name={facility} 
                                 checked={facilities.findIndex(el => el.name === `${facility}.svg`) >= 0 ? true : false} onChange={() => handleCheckboxes(facility)}  />}
                                 label={facility}
                                 />
                              </div>
                           )
                        })
                     }
                  </div>

               </div>
            </div>
         </div>
      </React.Fragment>
   )
}

export default AddEditBottomRight