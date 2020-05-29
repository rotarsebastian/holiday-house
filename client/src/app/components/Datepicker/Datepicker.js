import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import  { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Datepicker.css';
import moment from 'moment';

const Datepicker = ({ newLabel, handleChange, page, date, minDate, disableDay, id }) => {

   const handleDateChange = date => {
      handleChange(date, newLabel);
   }

   const disableSameDate = date => {
      return moment(date).isSame(disableDay, 'day')
   }

   // let minimumDay = moment();

   // if(page !== "Sign up" && newLabel === 'Check in') minimumDay = moment();
   // else minimumDay = moment().add(1, 'days');

   let datePickerSearch;

   if(newLabel === 'Check in' || newLabel === 'Available from') {
      datePickerSearch = 
      <KeyboardDatePicker
         disableToolbar
         variant="inline"
         format="yyyy-MM-dd"
         disablePast={minDate !== undefined ? true : false}
         margin="normal"
         minDate={minDate !== undefined ? minDate : moment().subtract(30, 'year').format('yyyy-MM-DD')}
         id={"date-picker-inline" + newLabel}
         label={newLabel}
         shouldDisableDate={disableSameDate}
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
         disablePast="true"
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
         disablePast="true"
         margin="normal"
         id={"date-picker-inline" + newLabel + id}
         label={newLabel}
         shouldDisableDate={disableSameDate}
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