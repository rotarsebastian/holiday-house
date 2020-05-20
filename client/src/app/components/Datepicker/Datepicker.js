import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import  { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Datepicker.css';


const Datepicker = (props) => {

   const [selectedDate, setSelectedDate] = useState(new Date());
   const handleDateChange = (date) => {setSelectedDate(date)};
      
   return (
      <div className='DatePickerContainer'>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
               margin="normal" 
               id="date-picker-dialog" 
               label="Birthdate" 
               format="dd/MM/yyyy"
               value={selectedDate} 
               onChange={handleDateChange} 
               KeyboardButtonProps={{'aria-label': 'change date'}}
            />
         </MuiPickersUtilsProvider>
      </div>
   );
};

export default Datepicker;