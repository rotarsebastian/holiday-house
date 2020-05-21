import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import  { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './Datepicker.css';


const Datepicker = ({newLabel}) => {

   
   const [selectedDate, setSelectedDate] = useState(new Date('1999-01-25'));
   const handleDateChange = date => setSelectedDate(date);

      
   return (
      <div className='DatePickerContainer'>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy/MM/dd"
            margin="normal"
            id="date-picker-inline"
            label={newLabel}
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
               'aria-label': 'change date',
            }}
         />
         </MuiPickersUtilsProvider>
      </div>
   );
};

export default Datepicker;