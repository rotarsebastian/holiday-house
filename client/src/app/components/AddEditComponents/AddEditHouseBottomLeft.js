import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
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

   
   const changeDate = (newDate, label) => {
      const date = moment(newDate).format('yyyy-MM-DD');

      console.log(date)
   
      if (label === "Available from") setFrom(date);
      else setTo(date);
   };
      

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
                  select
                  label="Price per night" 
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
                  >

                  {/* {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))}  */}
                  </TypeTextField>
               </div>  
               <div className={classes.LeftSelectContainer}> 
                  <CapacityTextField 
                      id="outlined-select"
                  select
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
                  select
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
                  select
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
                  select
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