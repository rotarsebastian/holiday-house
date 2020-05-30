import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import  { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Datepicker.css';
import moment from 'moment';

const Datepicker = ({ newLabel, handleChange, page, date, minDate, id, isEditPage }) => {

   const handleDateChange = date => handleChange(date, newLabel);

   let datePickerSearch;

   if(newLabel === 'Check in' || newLabel === 'Available from') {
      datePickerSearch = 
      <KeyboardDatePicker
         disableToolbar
         variant="inline"
         format="yyyy-MM-dd"
         disablePast={isEditPage ? false : true}
         margin="normal"
         id={"date-picker-inline" + newLabel}
         label={newLabel}
         value={date}
         onChange={handleDateChange}
         KeyboardButtonProps={{
            'aria-label': 'change date',
         }}
      />
   } else if(newLabel === 'Check out' || newLabel === 'Available until' || newLabel === 'To') {
      datePickerSearch = 
      <KeyboardDatePicker
         disableToolbar
         variant="inline"
         format="yyyy-MM-dd"
         margin="normal"
         minDate={minDate}
         id={"date-picker-inline" + newLabel + id}
         label={newLabel}
         value={date}
         onChange={handleDateChange}
         KeyboardButtonProps={{
            'aria-label': 'change date',
         }}
      />
   } else if(newLabel === 'From') {
      datePickerSearch = 
      <KeyboardDatePicker
         disableToolbar
         variant="inline"
         format="yyyy-MM-dd"
         disabled={moment(date).isSameOrBefore(moment(), 'day') ? true : false}
         disablePast={moment(date).isAfter(moment(), 'day') ? true : false}
         minDate={moment(date).isAfter(moment(), 'day') ? moment().add(1, 'days').format('yyyy-MM-DD') : false}
         margin="normal"
         id={"date-picker-inline" + newLabel + id}
         label={newLabel}
         value={date}
         onChange={handleDateChange}
         KeyboardButtonProps={{
            'aria-label': 'change date',
         }}
      />
   }
      
   return (
      <div className='DatePickerContainer reservationCardClass' >
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         { page && page === "Sign up" ? 
            <KeyboardDatePicker
               disableToolbar
               variant="inline"
               format="yyyy-MM-dd"
               maxDate={moment().subtract(18, 'year').format('yyyy-MM-DD')}
               minDate={moment().subtract(120, 'year').format('yyyy-MM-DD')}
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
            datePickerSearch
         }
         </MuiPickersUtilsProvider>
      </div>
   );
};

export default Datepicker;