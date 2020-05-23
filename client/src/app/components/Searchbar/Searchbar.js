import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import './Searchbar.css';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';

const CityTextField = withStyles({
   root: {
      textTransform: "uppercase",
      width: '20vw',
      fontSize: "1rem",
      borderRight:' 1px solid #dbdbdb',
      '& MuiFormLabel-root': {
         fontFamily: "Quicksand Regular !important",

      },
      '& label.Mui-focused': {
         color: '#E4215B',
      },
      '& .MuiOutlinedInput-root': {
         '& .PrivateNotchedOutline-root-60':{
            borderWidth: '0px',
            fontSize: '0.9rem',
         },
        '&.Mui-focused fieldset': {
          borderColor: '#E4215B',
        },
        '& label.Mui-focused': {
          color: 'pink',
        },
      },
    },
})(TextField);

const GuestsTextField = withStyles({
   root: {
      textTransform: "uppercase",
      fontSize: "1rem",
      '& label.Mui-focused': {
         color: '#E4215B',
      },
      '& .MuiOutlinedInput-root': {
      '& .PrivateNotchedOutline-root-60':{
         borderWidth: '0px'
      },
      '& .PrivateNotchedOutline':{
         borderWidth: '0px'
      },
      '&.Mui-focused fieldset': {
         borderColor: '#E4215B',
      },
      '& label.Mui-focused': {
         color: 'black',
        },
      },
    },
})(TextField);

const SearchButton = withStyles({
   root: {
      width: '100%',
      height: '56px',
      fontWeight: 'bold',
      borderRadius: '0.9rem',
      fontSize: '13.5px',
      backgroundColor: '#E4215B',
      boxShadow: 'none',
      '&:hover': {
         boxShadow: 'none',
         backgroundColor: '#f02551'
      },
      '&:focused': {
         boxShadow: 'none',
         backgroundColor: 'black'
      },
      '&:active': {
         boxShadow: 'none',
         transition: '0.1s',
         color: 'pink',
         
      },
      '& .MuiButton-label': {
         color: 'white' 
      },
      textTransform: 'none',
      '@media (min-width: 1024px)': {
         button: {
           width: 200
         }
      },
   }
})(Button);

const SearchbarComponents = props => {
         
   const [ city, setCity ] = useState('');
   const [ from, setFrom ] = useState(moment().format('yyyy-MM-DD'));
   const [ to, setTo ] = useState(moment().add(1, 'days').format('yyyy-MM-DD'));
   const [ guests, setGuests ] = useState('');
   const [ isDisabled, setDisabled ] = useState(true);
   
   const changeDate = (newDate, label) => {
      const date = moment(newDate).format('yyyy-MM-DD');
   
      if (label === "Check in") setFrom(date);
      else setTo(date);
   };

   const handleChangeInput = (e, input) => {
      if(input === 'guests') {
         if(e.target.value === '') setGuests('');
         else setGuests(parseInt(e.target.value));

         if(city.length > 0 && parseInt(e.target.value) > 0) setDisabled(false);
         else setDisabled(true);
      } else {
         setCity(e.target.value);

         if(e.target.value.length > 1 && parseInt(guests) > 0) setDisabled(false);
         else setDisabled(true);
      }
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
                     onChange={e => handleChangeInput(e, 'city')} />
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
               <div className={"SearchRight"}>
                  <GuestsTextField 
                     id="outlined-input" 
                     label="Guests" 
                     type="number"
                     placeholder="How many will you be?" 
                     variant="outlined"
                     value={guests}
                     onChange={e => handleChangeInput(e, 'guests')}
                  />
                  <div className="SearchbarButtonContainer">
                     <SearchButton 
                        variant="contained" 
                        disabled={isDisabled}
                        onClick={() => props.clickSearch(city, from, to, guests)}
                     >
                     <div className="classes.SearchIcon"><FontAwesomeIcon icon={faSearch} /></div>
                     Search
                     </SearchButton>
                  </div>  
               </div>   
            </div>
         </div>
      </React.Fragment>
   )
};

export default SearchbarComponents;