import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classes from './AddEditComponents.module.css';
import countries from '../../assets/testData';
// import Person from '@material-ui/icons/Person';

const TitleTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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
   }
})(TextField);

const DescriptionTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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

const AddressTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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

const PostalTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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

const CityTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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

const CountryTextField = withStyles({
   root: {
      width: '100%',
      marginTop: '10px',
      color:'red',
      '& label.Mui-focused': {
         color: '#E4215B',
       },
     '& .MuiOutlinedInput-root': {
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

const AddEditHouseTop = () => {

   const [country, setCountry] = useState('');

  const handleChange = (event) => {
   setCountry(event.target.value);
  };

   return (
      <React.Fragment>
         <div className={classes.AddEditHouseTopContainer}>
            <div className={classes.AddEditHouseTopBody}>
               <div>
                  <TitleTextField 
                     id="outlined-required" 
                     label="Title" 
                     type="text" 
                     required={true}
                     placeholder="Add A Title" 
                     variant="outlined" 

                     />
               </div>      
               <div>
                  <DescriptionTextField 
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  required={true}
                  placeholder="Tell us about your property!"
                  variant="outlined"
                  />
               </div>  
               <div>
                  <AddressTextField 
                  id="outlined-required" 
                  label="Address" 
                  type="text" 
                  required={true}
                  placeholder="Where is it?" 
                  variant="outlined" 
                  />
               </div>      
               <div>
                  <PostalTextField 
                  id="outlined-required" 
                  label="Postal code" 
                  type="number" 
                  required={true}
                  placeholder="eg. 2100, 2300" 
                  variant="outlined" 
                  />
               </div>      
               <div className={classes.CityCountryContainer}>
                  <CityTextField 
                  id="outlined-required" 
                  label="Address" 
                  type="text" 
                  required={true}
                  placeholder="Where is it?" 
                  variant="outlined" 
                  />

                  <CountryTextField 
                  id="outlined-select"
                  select
                  label="Country" 
                  required={true}
                  // IconComponent = {Person}
                  value={country}
                  placeholder="Select country"
                  onChange={handleChange}
                  variant="outlined" 
                  >

                  {countries.map(country => (
                     <MenuItem key={country} value={country}>
                     {country}
                     </MenuItem>
                  ))} 

                  </CountryTextField>
               </div>      
            </div>
         </div>
      </React.Fragment>
   )
};

export default AddEditHouseTop;