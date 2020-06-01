import React, { useState, useCallback, useEffect } from 'react';
import './Searchbar.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from '../Datepicker/Datepicker';
import moment from 'moment';
import { debounce } from 'lodash';
import { citySearch } from './../../helpers/properties';

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
      width: '70%',
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

   // ====================== STANDARD ======================
   const [ city, setCity ] = useState('');
   const [ from, setFrom ] = useState(moment().format('yyyy-MM-DD'));
   const [ to, setTo ] = useState(moment().add(1, 'days').format('yyyy-MM-DD'));
   const [ guests, setGuests ] = useState('');

   // ====================== CUSTOM ======================
   const [ minPrice, setMinPrice ] = useState(0);
   const [ maxPrice, setMaxPrice ] = useState(99999);
   const [ types, setTypes ] = useState([]);

   // ====================== OTHER ======================
   const [ queryLoaded, setQueryLoaded ] = useState(false);
   const [ showFilters, setShowFilters ] = useState(false);
   const [ isDisabled, setDisabled ] = useState(true);
   const [ searchResults, setSearchResults ] = useState([]);
   const [ minDateTo, setMinDateTo ] = useState(moment().add(1, 'days').format('yyyy-MM-DD'));
   const [ disableSameDate, setDisableSameDate ] = useState(moment().subtract(1, 'day').format('yyyy-MM-DD'));

   useEffect(() => {
      // ====================== POPULATE SEARCH BAR ======================
      if(props.populateSearch && !queryLoaded) {
         for(let prop in props.populateSearch) {

            // ====================== HANDLE TYPES ======================
            if(prop === 'types') {
               if(props.populateSearch[prop].length > 0) {
                  const popTypes = props.populateSearch[prop].map(type => capitalize(decodeURIComponent(type.split('=')[1])));
                  setTypes(popTypes);
               }
            } 
            // ====================== ALL OTHER CASES ======================
            else {
               if(props.populateSearch[prop] !== null) {
                  switch (prop) {
                     case 'city':
                        setCity(capitalize(props.populateSearch[prop]));
                        break;
                     case 'guests':
                        setGuests(parseInt(props.populateSearch[prop]));
                        break;
                     case 'from':
                        setFrom(moment(props.populateSearch[prop]).format('yyyy-MM-DD'));
                        break;
                     case 'to':
                        setTo(moment(props.populateSearch[prop]).format('yyyy-MM-DD'));
                        break;
                     case 'minPrice':
                        setMinPrice(parseInt(props.populateSearch[prop]));
                        break;
                     case 'maxPrice':
                        setMaxPrice(parseInt(props.populateSearch[prop]));
                        break;
                     default:
                        break;
                  }
               }
            }
         }
         if(props.populateSearch['city'].length > 0 && parseInt(props.populateSearch['guests']) > 0) setDisabled(false);
         setQueryLoaded(true);
      }

   }, [props, city, queryLoaded, types])

   const handler = useCallback(debounce(text => handleSearchRequest(text), 400), []);

   const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
   
   const changeDate = (newDate, label) => {
      const date = moment(newDate).format('yyyy-MM-DD');
   
      if (label === "Check in") {
         setFrom(date);
         if(moment(to).isSameOrBefore(date, 'day')) setTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
         setMinDateTo(moment(date).add(1, 'days').format('yyyy-MM-DD'));
      }
      else { 
         setTo(date);
         setDisableSameDate(moment(date).format('yyyy-MM-DD'));
      }
   };

   const handleSearchRequest = async(city) => {
      const results = await citySearch(city);
      setSearchResults(results);
   }

   const handleChangeInput = (e, input) => {
      if(input === 'guests') {
         if(e.target.value === '') setGuests('');
         else setGuests(parseInt(e.target.value));

         if(city.length > 0 && parseInt(e.target.value) > 0) setDisabled(false);
         else setDisabled(true);
      } else {
         setCity(e.target.value);

         if(e.target.value.length > 1) {
            handler(e.target.value);
            if(parseInt(guests) > 0) setDisabled(false);
         }
         else {
            setDisabled(true);
            setSearchResults([]);
         }

      }
   }

   const handleClickOnResult = result => {
      setCity(result);
      setSearchResults([]);
   }

   const handleChangePrice = (e, newValue) => {
      setMinPrice(newValue[0]);
      if(newValue[1] === 5000) setMaxPrice(99999);
      else setMaxPrice(newValue[1]);
   }

   const handleTypesChange = type => {
      const typeIndex = types.indexOf(type);
      if(typeIndex >= 0) {
         const newTypes = [ ...types ];
         newTypes.splice(typeIndex, 1);
         setTypes(newTypes);
      } else setTypes([ ...types, type ]);
   }

   const handleClickSearchButton = () => {
      setDisabled(true);
      setTimeout(() => setDisabled(false), 500);
      props.clickSearch(city, from, to, guests, minPrice, maxPrice, types)
   }

   const changeBorder = searchResults.length > 0 ? ' ChangeBorder' : '';

   let animation = '';

   if(props.withFilters && showFilters) animation = ' animated fadeInDown fast';
      
   return (
      <React.Fragment>
         <div className="SearchbarContainer">
            <div className={"SearchbarBody" + changeBorder}>
               <div className="SearchInputContainer">
                  <CityTextField 
                     id="outlined-search-input" 
                     label="Location" 
                     type="search" 
                     placeholder="Where are you going?" 
                     variant="outlined" 
                     value={city}
                     onChange={e => handleChangeInput(e, 'city')} 
                  />
                  { searchResults.length > 0 && city.length > 0
                     ? 
                     <div className="SearchResults">
                        {
                           searchResults.map(result => {
                              return(
                                 <div key={result} className="Result" onClick={() => handleClickOnResult(result)}>
                                    { result }
                                 </div>
                              )
                           })
                        }
                     </div>
                     : 
                     undefined
                  }
               </div>   
               <div>
                  <Datepicker 
                     newLabel="Check in" 
                     handleChange={changeDate}
                     minDate={moment().format('yyyy-MM-DD')}
                     disableDay={disableSameDate}
                     date={from}
                   />
               </div>   
               <div>
                  <Datepicker 
                     newLabel="Check out"
                     handleChange={changeDate}
                     minDate={minDateTo}
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
                        onClick={handleClickSearchButton}
                     >
                     <FontAwesomeIcon icon={faSearch} />
                     Search
                     </SearchButton>
                  </div>  
               </div>   
            </div>
            {
               props.withFilters 
                  ?
                  <React.Fragment>
                     <div onClick={() => setShowFilters(!showFilters)} className={`ShowFilters${showFilters ? ' Active' : ''}`}>{ showFilters ? 'Hide' : 'Show' } filters <i className="fas fa-caret-down"></i></div>
                     {
                        showFilters 
                           ?
                           <div className={`FiltersContainer${animation}`}>
                              <div className="PriceRanger">
                                 <div className="MinPrice">0 kr</div>
                                 <div className="Ranger">
                                    <Typography id="range-slider" gutterBottom>
                                       Price per night
                                    </Typography>
                                    <Slider
                                       min={0}
                                       max={5000}
                                       value={[ minPrice, maxPrice > 5000 ? 5000 : maxPrice ]}
                                       onChange={handleChangePrice}
                                       valueLabelDisplay="auto"
                                       aria-labelledby="range-slider"
                                       // getAriaValueText={valuetext}
                                    />
                                 </div>
                                 <div className="MaxPrice">5000 kr</div>
                              </div>
                              <div className="HouseTypes">
                                 <div className="Title">House type:</div>
                                 <div className="TypesCheckboxesContainer">
                                    <FormControlLabel
                                       value="Entire place"
                                       control={<Checkbox color="primary" checked={types.indexOf('Entire place') >= 0 ? true : false} onChange={() => handleTypesChange('Entire place')} />}
                                       label="Entire place"
                                       labelPlacement="end"
                                    />

                                    <FormControlLabel
                                       value="Private room"
                                       control={<Checkbox color="primary" checked={types.indexOf('Private room') >= 0 ? true : false} onChange={() => handleTypesChange('Private room')} />}
                                       label="Private room"
                                       labelPlacement="end"
                                    />
                                    
                                    <FormControlLabel
                                       value="Shared room"
                                       control={<Checkbox color="primary" checked={types.indexOf('Shared room') >= 0 ? true : false} onChange={() => handleTypesChange('Shared room')} />}
                                       label="Shared room"
                                       labelPlacement="end"
                                    />
                                 </div>
                              </div>
                           </div>
                           : 
                           undefined
                     }
                  </React.Fragment>
                  :
                  undefined
            }
         </div>
      </React.Fragment>
   )
};

export default SearchbarComponents;