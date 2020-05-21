import React, {useState} from 'react'
import './Searchbar.module.css'
import TextField from '@material-ui/core/TextField';
import classes from './Searchbar.module.css';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';
import {getProperties} from '../../helpers/properties'

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
      width: '20vw',
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
      textTransform: 'none'
   }
})(Button);




const SearchbarComponents = () => {
         
   const [ city, setCity ] = useState('');
   const [ from, setFrom ] = useState('1999-01-25');
   const [ to, setTo ] = useState('1999-01-25');
   const [ guests, setGuests ] = useState('');
   const offset = 0

   const handleSearch = async() => {
      console.log(city, from, to, guests);
      getProperties(from, to, guests, city, offset)
   }
   
   const changeDate = (newDate, label) => {
         const date = moment(newDate).format('yyyy-MM-DD');
      
         if (label === "Check in") setFrom(date);
         else setTo(date);
      };
      

   return (
      <React.Fragment>
         <div className="SearchbarContainer">
            <div className={classes.SearchbarBody}>
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
                   />
               </div>   
               <div>
                  <Datepicker 
                     newLabel="Check out"
                     handleChange={changeDate}
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
               <div className={classes.SearchbarButtonContainer}>
                  <SearchButton variant="contained" onClick={() => handleSearch()}>
                  <div className={classes.SearchIcon}><FontAwesomeIcon icon={faSearch} /></div>Search</SearchButton>
               </div>  
            </div>
         </div>
      </React.Fragment>
   )
};

export default SearchbarComponents;