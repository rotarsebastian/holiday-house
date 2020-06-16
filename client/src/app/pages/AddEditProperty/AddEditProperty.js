import React, { useRef, useEffect, useState } from 'react';
import ak from '../../assets/configFile';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from '@material-ui/core/Button';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import './AddEditProperty.css';
import { validateForm } from '../../helpers/validation';
import AddEditHouseTop from '../../components/AddEditComponents/AddEditHouseTop'
import AddEditHouseBottomLeft from '../../components/AddEditComponents/AddEditHouseBottomLeft';
import AddEditHouseBottomRight from '../../components/AddEditComponents/AddEditHouseBottomRight';
import {withStyles} from '@material-ui/core/styles';
import moment from 'moment';
import toastr from 'toastr';
import { createProperty } from '../../helpers/properties';
import { editProperty, getOneProperty } from '../../helpers/properties';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const SubmitFormButton = withStyles({
    root: {
       width: '30%',
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

const AddProperty = props => {

    const history = useHistory();

    // ====================== LOADING ELEMENTS ======================
    const [ isLoading, setIsLoading ] = useState(true);
    const [ loadingButton, setLoadingButton ] = useState(false);

    // ====================== MAP STATE ======================
    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(12.5718);    
    const [ lat, setLat ] = useState(55.6466);  
    const [ zoom ] = useState(15);    
    const [ currentMarker ] = useState([]);    
    const [ currentMarkerCoords, setCurrentMarkerCoords ] = useState([]);    
    const addPropertyMap = useRef(null);

    // ====================== PROPERTY STATE ======================
    const [ propertyID, setPropertyID ] = useState(undefined);
    const [ files, setFiles ] = useState([]);
    const [ oldImages, setOldImages ] = useState([]);
    const [ topData, setTopData ] = useState([ '', '', '', '', '', '' ]);
    const [ bottomLeftData, setBottomLeftData ] = useState([ moment().format('yyyy-MM-DD'), moment().add(1, 'days').format('yyyy-MM-DD'), '', '', '', '', '', '' ]);
    const [ bottomRightData, setBottomRightData ] = useState([]);

    useEffect(() => {
        mapboxgl.accessToken = ak('map');

        const populateForm = async(id) => {
            const result = await getOneProperty(id);
            if(result.status === 1) {
                setPropertyID(result.data.id);

                // ====================== POPULATE ADDRESS AND TITLE DATA ======================
                setTopData([
                    capitalize(result.data.title), 
                    capitalize(result.data.description), 
                    capitalize(result.data.address.property_address),
                    result.data.address.postal_code,
                    capitalize(result.data.address.city),
                    capitalize(result.data.address.country)
                ])

                // ====================== POPULATE HOUSE PROPERTIES ======================
                setBottomLeftData([
                    moment(result.data.available_start).format('yyyy-MM-DD'),
                    moment(result.data.available_end).format('yyyy-MM-DD'),
                    JSON.stringify(result.data.price),
                    capitalize(result.data.type),
                    JSON.stringify(result.data.capacity),
                    JSON.stringify(result.data.rooms),
                    JSON.stringify(result.data.beds),
                    JSON.stringify(result.data.bathrooms)
                ])

                // ====================== ADJUST THE MARKER ON THE MAP ======================
                setLng(result.data.coordinates[0]);
                setLat(result.data.coordinates[1]);

                // ====================== IF FACILITIES CHECK THEM ======================
                if(result.data.facilities !== null) {
                    const facilities = JSON.parse(result.data.facilities.facilities_list);
                    setBottomRightData(facilities);
                }

                // ====================== SET PREVIOUS IMAGES ======================
                setOldImages(result.data.photos);

                // ====================== RETURN COORDINATES ======================
                return [result.data.coordinates[0], result.data.coordinates[1]]
            }
        }

        const initPage = async() => {
            // ====================== IF EDIT PAGE POPULATE FORM ======================
            if(props.from){
                const coords = await populateForm(props.match.params.id);
                addMap(coords[0], coords[1]);
            } else addMap();
        };

        const addMap = (longitude, latitude) => {
            const currentLng = longitude ? longitude : lng;
            const currentLat = latitude ? latitude : lat;

            const map = new mapboxgl.Map({
                container: addPropertyMap.current ? addPropertyMap.current : '',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [ currentLng, currentLat ],
                zoom,
                attributionControl: false,
            });

            map.on('load', () => {
                const layersToRemove = ['country-label', 'state-label', 'settlement-label'];
                layersToRemove.forEach(layer => map.removeLayer(layer));

                const geolocate = new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                        timeout: 1800 /* 1.8 sec */
                    },
                    fitBoundsOptions: {
                        maxZoom: 30
                    },
                    trackUserLocation: true,
                    showAccuracyCircle: false,
                    showUserLocation: false,
                }); 

                map.addControl(geolocate);

                geolocate.on('geolocate', data => {
                    const { longitude, latitude } = data.coords;
                    addMarker(undefined, map, longitude, latitude);
                });
                
                const markerHTML = document.createElement('div');
                markerHTML.className = 'markerPick';
    
                const marker = new mapboxgl.Marker(markerHTML)
                    .setLngLat([ currentLng, currentLat ])
                    .addTo(map)
    
                currentMarker.push(marker);
                setCurrentMarkerCoords([ currentLng, currentLat ]);

                setMap(map);
                map.resize();
                setIsLoading(false);
            });

            map.on('click', e => addMarker(e, map));
            
        }
    
        if (!map) initPage();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ====================== FUNCTIONS ======================
    const setData = data => setTopData(data);
    const setLeftData = data => setBottomLeftData(data);
    const setRightData = data => setBottomRightData(data);
    const setNewFiles = files => setFiles(files);
    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
    const removeOldImage = image => setOldImages(oldImages.filter(img => img !== image));
    const clearMarker = () => currentMarker.forEach(marker => marker.remove());
    
    const addMarker = (e, map, lng, lat) => {
        // ====================== PARSE DATA ======================
        let long = lng ? lng : e.lngLat.lng;
        let lati = lat ? lat : e.lngLat.lat;

        clearMarker();

        // ====================== CREATE NEW MARKER ======================
        const markerHTML = document.createElement('div');
        markerHTML.className = 'markerPick';
        const marker = new mapboxgl.Marker(markerHTML)
            .setLngLat([ long, lati ])
            .addTo(map)

        // ====================== FLY TO THE NEW MARKER POSITION ON THE MAP ======================
        map.flyTo({ center: [ long, lati ] });

        // ====================== ADJUST MARKER DATA ======================
        currentMarker.push(marker);
        setCurrentMarkerCoords([ long, lati ]);
    }

    const submitForm = async() => {
        // ====================== CREATING THE ADDRESS OBJECT ======================
        const addressObject = {
            property_address: topData[2],
            city: topData[4],
            country: topData[5],
            postal_code: topData[3],
        }

        // ====================== CHECK IF WE HAVE AT LEAST ON IMAGE DEPENDING ON THE PAGE WE SHOW ======================
        if(!props.from && files.length < 1) return toastr.warning('You need to upload at least one image!');
        if(props.from && files.length < 1 && oldImages.length < 1 ) return toastr.warning('You need to upload at least one image!');

        // ====================== VALIDATION ======================
        const addPropertyData = [
            { type: 'title', val: topData[0] }, 
            { type: 'description', val: topData[1] }, 
            { type: 'available_start', val: bottomLeftData[0] }, 
            { type: 'available_end', val: bottomLeftData[1] }, 
            { type: 'price', val: parseInt(bottomLeftData[2]) }, 
            { type: 'capacity', val: parseInt(bottomLeftData[4]) }, 
            { type: 'type', val: bottomLeftData[3] }, 
            { type: 'rooms', val: parseInt(bottomLeftData[5]) },
            { type: 'beds', val: parseInt(bottomLeftData[6]) },
            { type: 'bathrooms', val: parseInt(bottomLeftData[7]) },
            { type: 'coordinates', val: JSON.stringify(currentMarkerCoords) }, 
            { type: 'address', val: JSON.stringify(addressObject) },
            { type: 'facilities', val: JSON.stringify(bottomRightData) },
        ];

        const isFormValid = validateForm(addPropertyData);
        if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

        // ====================== IF EDIT PAGE ADD PREVIOUS IMAGES ======================
        if(props.from) addPropertyData.push({ type: 'photos', val: JSON.stringify(oldImages) });

        // ====================== CREATE NEW REQUEST FORM DATA ======================
        const requestData = new FormData();

        // ====================== APPEND JSON DATA AND IMAGES ======================
        requestData.append('data', JSON.stringify(addPropertyData));
        files.map(file => requestData.append('image', file, file.name))

        // ====================== MAKING REQUEST ======================
        setLoadingButton(true);
        const res = props.from ? await editProperty(propertyID, requestData) : await createProperty(requestData);
        setLoadingButton(false);

        // ====================== HANDLE RESPONSE ======================
        if(res.status === 1) {
            // ====================== DEPENDING ON THE PAGE SHOW SUCCESS MESSAGE ======================
            if(props.from) toastr.success('Property edited successfully!');
            else toastr.success('Property created successfully!');

            history.push('/profile');
        } else return toastr.error(res.message);
    }

    // ====================== FILL DATA AUTOMATICALLY WHEN SELECTING ADDRESS FROM DROPDOWN ======================
    const fillAddressData = place => {
        const newData = [ ...topData ];

        // ====================== GET NEW DATA VALUES ======================
        newData[2] = place.place_name;
        if(place.context && place.context[0]) newData[3] = place.context[0].text;
        if(place.context && place.context[1]) newData[4] = place.context[1].text;
        if(place.context && place.context[3]) newData[5] = place.context[3].text;
        
        setTopData(newData);
        addMarker(undefined, map, place.geometry.coordinates[0], place.geometry.coordinates[1]);
    }
    
    // ====================== DYNAMIC VARIABLES ======================
    const showMap = isLoading ? '0' : '1';
    const buttonName = props.from ? 'Save Changes' : 'Add property';
    
    return (
        <React.Fragment>
            <div className="loading"><ClipLoader size={50} color={'#e83251'} loading={isLoading}/></div>

            <h1 className="AddPropertyTitle">Rent your place in no time!</h1>
            <div className="AddPropertyContainer" style={{ opacity: showMap }}>

                {/* FIRST ROW - ADDRESS & MAP */}
                <div className="FirstRow">
                    {/* TITLE - DESCRIPTION - ADDRESS */}
                    <AddEditHouseTop data={topData} setData={setData} onSetAddress={fillAddressData} />
                    
                    {/* MAP */}
                    <div className="MapContainer">
                        <h3 className="PickAddressText">Pick your home address on the map: *</h3>
                        <div ref={addPropertyMap} className="addPropertyMap"></div>
                        <p className="PickAddressTip">Tip: <span>Add the marker close to your home main entrance</span></p>
                    </div>
                </div>

                {/* SECOND ROW - AVAILABILITY & FACILITIES */}
                <div className="SecondRow">

                    {/* AVAILABILITY AND HOUSE PROPERTIES */}
                    <AddEditHouseBottomLeft data={bottomLeftData} setData={setLeftData} edit={props.from ? true : false} />

                    { 
                        props.from && bottomRightData.length > 0
                        ? 
                        <AddEditHouseBottomRight data={bottomRightData} setData={setRightData} populate={bottomRightData} />
                        : 
                        undefined
                    }

                    { 
                        props.from && bottomRightData.length === 0
                        ? 
                        <AddEditHouseBottomRight data={bottomRightData} setData={setRightData} populate={bottomRightData} />
                        : 
                        undefined
                    }       

                    { 
                        !props.from
                        ? 
                        <AddEditHouseBottomRight data={bottomRightData} setData={setRightData} />
                        : 
                        undefined
                    }
                </div>

                {/* IF EDIT PAGE SHOW PREVIOUS PROPERTY IMAGES */}
                { 
                    props.from 
                    ? 
                    <div className="ThumbsContainer">
                        {
                            oldImages.map(image => {
                                return (
                                    <div className="Thumb" key={image}>
                                        <span className="CloseContainer" onClick={() => removeOldImage(image)}>
                                            <FontAwesomeIcon className="CloseButton" icon={faTimes} />
                                        </span>
                                        <div className="ThumbInner">
                                            <img src={'https://holidayhouse1.s3.amazonaws.com/properties/' + image} alt={'thumb-img'} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    undefined
                }

                {/* ADD NEW IMAGES FOR YOUR PROPERTY */}
                <DragAndDrop files={files} setNewFiles={setNewFiles} />
                    
                {/* SUBMIT FORM */}
                <div className="FourthRow">
                    <SubmitFormButton variant="contained" onClick={submitForm}> 
                        { 
                            loadingButton 
                            ? 
                            <ClipLoader size={18} color={'#fff'} /> 
                            :
                            buttonName 
                        }
                    </SubmitFormButton>
                </div>

            </div>
        </React.Fragment>
    )
}

export default AddProperty;