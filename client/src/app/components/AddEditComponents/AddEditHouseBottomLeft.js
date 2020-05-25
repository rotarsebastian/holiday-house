import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import './AddEditComponents.module.css';
import classes from './AddEditComponents.module.css';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';

const PriceTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiSelect-selectMenu': {
         height:'10px',
      },
      '& .MuiOutlinedInput-root': {
         borderTopRightRadius: '0px',
         borderBottomRightRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);

const TypeTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiSelect-selectMenu': {
         height:'10px',
      },
      '& .MuiOutlinedInput-root': {
         borderTopLeftRadius: '0px',
         borderBottomLeftRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);

const CapacityTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiSelect-selectMenu': {
         height:'10px',
      },
      '& .MuiOutlinedInput-root': {
         borderTopRightRadius: '0px',
         borderBottomRightRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);

const RoomsTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiSelect-selectMenu': {
         height:'10px',
      },
      '& .MuiOutlinedInput-root': {
         borderTopLeftRadius: '0px',
         borderBottomLeftRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);

const BedsTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiSelect-selectMenu': {
         height:'10px',
      },
      '& .MuiOutlinedInput-root': {
         borderTopRightRadius: '0px',
         borderBottomRightRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);

const BathroomsTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      // maxHeight: '1.1876em',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
      '& .MuiOutlinedInput-root': {
         borderTopLeftRadius: '0px',
         borderBottomLeftRadius: '0px',
         marginLeft: '-1px',

         '&.Mui-focused fieldset': {
            border: '2px solid #E4215B',
         },
         '& label.Mui-focused': {
            color: 'black',
         },
      }, 
     '& .MuiInputLabel-asterisk': {
      color: 'var(--color-title)',
      },
   },
})(TextField);


const AddEditHouseBottomLeft = () => {
   
   const [ from, setFrom ] = useState(moment().format('yyyy-MM-DD'));
   const [ to, setTo ] = useState(moment().format('yyyy-MM-DD'));
   const [ types, setTypes ] = useState('');
   
   const changeDate = (newDate, label) => {
      const date = moment(newDate).format('yyyy-MM-DD');
   
      if (label === "Available from") setFrom(date);
      else setTo(date);
   };

   const typesChange = e => {
      setTypes(e.target.value);
   };

   const typesOptions = ["Entire place", "Private room", "Shared room"]
      
   return (
      <React.Fragment>
         <div className={classes.AddEditHouseLeftContainer}>
            <div className={classes.AddEditHouseLeftBody}>
               <div className={classes.LeftDateContainer}>
                  <Datepicker 
                     newLabel="Available from" 
                     handleChange={changeDate}
                     date={from}
                  />
                  <Datepicker 
                     newLabel="Available until"
                     handleChange={changeDate}
                     date={to}
                  />
               </div>  
               <div className={classes.LeftSelectContainer}> 
                  <PriceTextField 
                  id="outlined-select"
                  label="Price per night" 
                  type="number"
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </PriceTextField>
                  <TypeTextField 
                  id="outlined-select"
                  select
                  label="Type of rental" 
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  onChange={typesChange}
                  >

                  {typesOptions.map(option => (
                     <MenuItem key={option} value={option}>
                     {option}
                     </MenuItem>
                  ))} 
                  </TypeTextField>
               </div>  
               <div className={classes.LeftSelectContainer}> 
                  <CapacityTextField 
                  id="outlined-select"
                  type="number"
                  label="Capacity" 
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </CapacityTextField>
                  <RoomsTextField 
                  id="outlined-select"
                  type="number"
                  label="Rooms" 
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </RoomsTextField>
               </div>   
               <div className={classes.LeftSelectContainer}> 
                  <BedsTextField 
                  id="outlined-select"
                  type="number"
                  label="Beds" 
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </BedsTextField>
                  <BathroomsTextField 
                  id="outlined-select"
                  type="number"
                  label="Bathrooms" 
                  required={true}
                  // value={country}
                  // onChange={handleChange}
                  variant="outlined" 
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </BathroomsTextField>
               </div>          
            </div>
         </div>
      </React.Fragment>
   )
};

export default AddEditHouseBottomLeft;