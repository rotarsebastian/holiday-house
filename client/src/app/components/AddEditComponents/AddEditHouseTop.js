import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classes from './AddEditComponents.module.css';
import countries from '../../assets/countries';
import { geolocate } from '../../helpers/geolocate';
import { debounce } from 'lodash';

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
         borderTopRightRadius: '0px',
         borderBottomRightRadius: '0px',
         borderRight: '0px',
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
         height: '56px',

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

const AddEditHouseTop = props => {

   const [ addressResults, setAddressResults ] = useState([]);

   const handler = useCallback(debounce(text => handleSearchRequest(text), 400), []);

   const handleSearchRequest = async(address) => {
      const response = await geolocate(address);
      if(response.status === 1) setAddressResults(response.features);
   }

   const setNewData = (e, type) => {
      const newData = [ ...props.data ];

      if(type === 'title') newData[0] = e.target.value;
      if(type === 'description') newData[1] = e.target.value;
      if(type === 'address') { 
         newData[2] = e.target.value;

         if(e.target.value.length > 2) {
            handler(e.target.value);
         }
      }
      if(type === 'postalcode') newData[3] = e.target.value;
      if(type === 'city') newData[4] = e.target.value;
      if(type === 'country') newData[5] = e.target.value;
      
      props.setData(newData);
   };

   const handleAddressBlur = () => setTimeout(() => setAddressResults([]), 100);

   const handleChooseAddress = e => {
      const placeData = addressResults.find(place => place.place_name === e.target.innerHTML);
      props.onSetAddress(placeData);
   }

   return (
      <React.Fragment>
         <div className={classes.AddEditHouseTopContainer}>
            <div className={classes.AddEditHouseTopBody}>
               <div>
                  <TitleTextField 
                     id="outlined-required-title" 
                     label="Title" 
                     type="text" 
                     required={true}
                     placeholder="Add a title" 
                     variant="outlined" 
                     value={props.data[0]}
                     onChange={e => setNewData(e, 'title')}
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
                     value={props.data[1]}
                     onChange={e => setNewData(e, 'description')}
                  />
               </div>  
               <div className={classes.AddressContainer}>
                  <AddressTextField 
                     id="outlined-required-address" 
                     label="Street and number" 
                     type="text" 
                     required={true}
                     placeholder="Where is it?" 
                     variant="outlined" 
                     value={props.data[2]}
                     onChange={e => setNewData(e, 'address')}
                     onBlur={() => handleAddressBlur()}
                  />
                  {
                     addressResults.length > 0
                     ?
                     <div className={classes.AddressResults}>
                        {
                           addressResults.map((address, index) => {
                              return (
                                 <div key={index} onClick={handleChooseAddress} className={classes.AddressResult}>{address.place_name}</div>
                              )
                           })
                        }
                     </div>
                     :
                     undefined
                  }
               </div>      
               <div>
                  <PostalTextField 
                     id="outlined-required-postal" 
                     label="Postal code" 
                     type="number" 
                     required={true}
                     placeholder="eg. 2100, 2300" 
                     variant="outlined" 
                     value={props.data[3]}
                     onChange={e => setNewData(e, 'postalcode')}
                  />
               </div>      
               <div className={classes.CityCountryContainer}>
                  <CityTextField 
                     id="outlined-required-city" 
                     label="City" 
                     type="text" 
                     required={true}
                     placeholder="Where is it?" 
                     variant="outlined" 
                     value={props.data[4]}
                     onChange={e => setNewData(e, 'city')}
                  />

                  <CountryTextField 
                     id="outlined-select"
                     select
                     label="Country" 
                     required={true}
                     value={props.data[5]}
                     onChange={e => setNewData(e, 'country')}
                     variant="outlined" 
                  >
                     { countries.map(country => (
                        <MenuItem key={country} value={country}>
                           { country } 
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