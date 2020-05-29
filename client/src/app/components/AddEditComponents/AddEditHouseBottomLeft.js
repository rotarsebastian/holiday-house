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


const AddEditHouseBottomLeft = props => {
   
   // ====================== DATES ======================
   // const [ from, setFrom ] = useState(props.data[0]);
   // const [ to, setTo ] = useState(props.data[1]);
   const [ minDateTo, setMinDateTo ] = useState(moment().add(1, 'days').format('yyyy-MM-DD'));
   const [ disableSameDate, setDisableSameDate ] = useState(moment().subtract(1, 'day').format('yyyy-MM-DD'));
   
   // ====================== OTHERS ======================
   const [ option, setTypeOptions ] = useState('');
   
   const changeDate = (newDate, newLabel) => {
      const date = moment(newDate).format('yyyy-MM-DD');

      if (newLabel === "Available from") {
         const newData = [ ...props.data ];
         newData[0] = date;

         if(moment(newData[1]).isBefore(date, 'day')) newData[1]= moment(date).add(1, 'days').format('yyyy-MM-DD');

         props.setData(newData)

         setMinDateTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
      } else {
         const newData = [ ...props.data ];
         newData[1] = date;
         props.setData(newData);
         setDisableSameDate(moment(date).format('yyyy-MM-DD'));
      }
   };

   const setNewData = (e, type) => {
      const newData = [ ...props.data ];

      if(type === 'price') newData[2] = e.target.value;
      if(type === 'type') newData[3] = e.target.value;
      if(type === 'capacity') newData[4] = e.target.value;
      if(type === 'rooms') newData[5] = e.target.value;
      if(type === 'beds') newData[6] = e.target.value;
      if(type === 'bathrooms') newData[7] = e.target.value;

      props.setData(newData);
   };


   const typesOptions = ["Entire place", "Private room", "Shared room"];
      
   return (
      <React.Fragment>
         <div className={classes.AddEditHouseLeftContainer}>
            <div className={classes.AddEditHouseLeftBody}>
               <div className={classes.LeftDateContainer}>

                  <Datepicker 
                     newLabel="Available from" 
                     handleChange={changeDate}
                     date={props.data[0]}
                     disableDay={disableSameDate}
                  />
                  <Datepicker 
                     newLabel="Available until"
                     handleChange={changeDate}
                     date={props.data[1]}
                     minDate={minDateTo}
                  />
               </div>  
               <div className={classes.LeftSelectContainer}> 
                  <PriceTextField 
                     id="outlined-select"
                     label="Price per night" 
                     type="number"
                     required={true}
                     variant="outlined" 
                     value={props.data[2]}
                     onChange={e => setNewData(e, 'price')}
                  />

                  <TypeTextField 
                     id="outlined-select"
                     select
                     label="Type of rental" 
                     required={true}
                     value={props.data[3]}
                     onChange={e => setNewData(e, 'type')}
                     variant="outlined" 
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
                     variant="outlined" 
                     value={props.data[4]}
                     onChange={e => setNewData(e, 'capacity')}
                  />

                  <RoomsTextField 
                     id="outlined-select"
                     type="number"
                     label="Rooms" 
                     required={true}
                     variant="outlined" 
                     value={props.data[5]}
                     onChange={e => setNewData(e, 'rooms')}
                  />
               </div>   
               <div className={classes.LeftSelectContainer}> 
                  <BedsTextField 
                     id="outlined-select"
                     type="number"
                     label="Beds" 
                     required={true}
                     variant="outlined" 
                     value={props.data[6]}
                     onChange={e => setNewData(e, 'beds')}
                  />

                  <BathroomsTextField 
                     id="outlined-select"
                     type="number"
                     label="Bathrooms" 
                     required={true}
                     variant="outlined" 
                     value={props.data[7]}
                     onChange={e => setNewData(e, 'bathrooms')}
                  />
               </div>          
            </div>
         </div>
      </React.Fragment>
   )
};

export default AddEditHouseBottomLeft;