import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import  { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Datepicker.css';
import moment from 'moment';

const Datepicker = ({ newLabel, handleChange, page, date, minDate }) => {

   const handleDateChange = date => {
      handleChange(date, newLabel);
   }

   // let minimumDay = moment();

   // if(page !== "Sign up" && newLabel === 'Check in') minimumDay = moment();
   // else minimumDay = moment().add(1, 'days');
      
   return (
      <div className='DatePickerContainer'>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         { page && page === "Sign up" ? 
            <KeyboardDatePicker
               disableToolbar
               variant="inline"
               format="yyyy-MM-dd"
               maxDate={moment().subtract(18, 'year')}
               margin="normal"
               id={"date-picker-inline" + newLabel}
               label={newLabel}
               value={date}
               onChange={handleDateChange}
               KeyboardButtonProps={{
                  'aria-label': 'change date',
               }}
            />
         :
            <KeyboardDatePicker
               disableToolbar
               variant="inline"
               format="yyyy-MM-dd"
               disablePast="true"
               margin="normal"
               minDate={minDate}
               id={"date-picker-inline" + newLabel}
               label={newLabel}
               value={date}
               onChange={handleDateChange}
               KeyboardButtonProps={{
                  'aria-label': 'change date',
               }}
            />
         }
         </MuiPickersUtilsProvider>
      </div>
   );
};

export default Datepicker;