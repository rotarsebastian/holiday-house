import React from 'react'
import TextField from '@material-ui/core/TextField';
import './AddEditComponents.module.css';
import Button from '@material-ui/core/Button';

const AddEditHouseBottomLeft = () => {
         
   const [ from, setFrom ] = useState(moment().format('yyyy-MM-DD'));
   const [ to, setTo ] = useState(moment().format('yyyy-MM-DD'));
 
   const changeDate = (newDate, label) => {
      const date = moment(newDate).format('yyyy-MM-DD');
   
      if (label === "Available from") setFrom(date);
      else setTo(date);
   }
      
   return (
      <React.Fragment>
         <div className="SearchbarContainer">
            <div className="SearchbarBody">
               <div>
                  <CityTextField 
                     id="outlined-search-input" 
                     label="Location" 
                     type="search" 
                     placeholder="Where are you going?" 
                     variant="outlined" 
                     value={city}
                     onChange={e => setCity(e.target.value)} />
               </div>   
               <div>
                  <Datepicker 
                     newLabel="Check in" 
                     handleChange={changeDate}
                     date={from}
                   />
               </div>   
               <div>
                  <Datepicker 
                     newLabel="Check out"
                     handleChange={changeDate}
                     date={to}
               />
               </div>    
               <div>
                  <GuestsTextField 
                     id="outlined-input" 
                     label="Guests" 
                     type="number"
                     placeholder="How many will you be?" 
                     variant="outlined"
                     value={guests}
                     onChange={e => setGuests(e.target.value)}
                  />
               </div>   
               <div className="SearchbarButtonContainer">
                  <SearchButton variant="contained" onClick={() => handleSearch()}>
                  <div className="classes.SearchIcon"><FontAwesomeIcon icon={faSearch} /></div>Search</SearchButton>
               </div>  
            </div>
         </div>
      </React.Fragment>
   )
};

export default AddEditHouseBottomLeft;