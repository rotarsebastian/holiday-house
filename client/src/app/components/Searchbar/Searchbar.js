import React from 'react'
import './Searchbar.module.css'
import TextField from '@material-ui/core/TextField';
import classes from './Searchbar.module.css';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faBorderNone} from '@fortawesome/free-solid-svg-icons';
import {withStyles} from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker'

const LocationTextField = withStyles({
   root: {
      textTransform: "uppercase",
      width: '20vw',
      fontSize: "1rem",
      borderRight:' 1px solid #dbdbdb',
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
      fontSize: '12px',
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

const handleSearch = () => {}

const SearchbarComponents = () => {
   return (
      <React.Fragment>
         <div className="SearchbarContainer">
            <div className={classes.SearchbarBody}>
               <div>
                  <LocationTextField id="outlined-search-input" label="Location" type="search" 
                  placeholder="Where are you going?" variant="outlined" />
               </div>   
               <div>
                  <Datepicker newLabel="Check in"  />
               </div>   
               <div>
                  <Datepicker newLabel="Check out"  />
               </div>    
               <div>
                  <GuestsTextField id="outlined-input" label="Guests" type="number"
                  placeholder="How many will you be?" variant="outlined"/>
               </div>   
               <div className={classes.SearchbarButtonContainer}>
                  <SearchButton variant="contained">Search</SearchButton>
               </div>  
            </div>
         </div>
      </React.Fragment>
   )
};

export default SearchbarComponents;