import React, { useRef, useEffect, useState } from 'react';
import ak from '../../assets/configFile';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from '@material-ui/core/Button';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import './AddProperty.css';
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

const AddPropertyButton = withStyles({
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

    const [ propertyID, setPropertyID ] = useState(undefined);
    
    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(12.5937767);    
    const [ lat, setLat ] = useState(55.657091699999995);    
    const [ zoom ] = useState(15);    
    const [ currentMarker ] = useState([]);    
    // eslint-disable-next-line
    const [ currentMarkerCoords, setCurrentMarkerCoords ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(true);
    const addPropertyMap = useRef(null);

    // Property attributes
    const [files, setFiles] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [topData, setTopData] = useState([ '', '', '', '', '', '' ]);
    const [bottomLeftData, setBottomLeftData] = useState([ moment().format('yyyy-MM-DD'), moment().add(1, 'days').format('yyyy-MM-DD'), '', '', '', '', '', '' ]);
    const [bottomRightData, setBottomRightData] = useState([]);

    useEffect(() => {
        // ===================== FOR DEVELOPMENT =====================
        // mapboxgl.accessToken = process.env.REACT_APP_MAP;
        mapboxgl.accessToken = ak('map');

        const populateForm = async(id) => {
            const result = await getOneProperty(id);
            if(result.status === 1) {
                setPropertyID(result.data.id);
                setTopData([
                    capitalize(result.data.title), 
                    capitalize(result.data.description), 
                    capitalize(result.data.address.property_address),
                    result.data.address.postal_code,
                    capitalize(result.data.address.city),
                    capitalize(result.data.address.country)
                ])

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

                setLng(result.data.coordinates[0])
                setLat(result.data.coordinates[1])

                const facilities = JSON.parse(result.data.facilities.facilities_list);
                setBottomRightData(facilities);

                setOldImages(result.data.photos);

                return [result.data.coordinates[0], result.data.coordinates[1]]
            }
        }

        const initPage = async() => {
            if(props.from){
                const coords = await populateForm(props.match.params.id);
                addMap(coords[0], coords[1]);
            }
            else if ('geolocation' in navigator) { 
                navigator.geolocation.getCurrentPosition(position => addMap(position.coords.longitude, position.coords.latitude)) 
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

                map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                        timeout: 1800 /* 1.8 sec */
                    },
                    trackUserLocation: true,
                    showAccuracyCircle: false,
                    showUserLocation: false,
                    
                })); 
                
                setTimeout(() => {
                    if(addPropertyMap.current) {
                        addPropertyMap.current.querySelector('.mapboxgl-ctrl-geolocate').addEventListener('click', () => {
                            setTimeout(() => addMarker(undefined, map, lng, lat), 2001);
                        });
                    }
                }, 500);
                
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

        const addMarker = (e, map, lng, lat) => {
            let long = lng ? lng : e.lngLat.lng;
            let lati = lat ? lat : e.lngLat.lat;
            clearMarker();

            const markerHTML = document.createElement('div');
            markerHTML.className = 'markerPick';
            const marker = new mapboxgl.Marker(markerHTML)
                .setLngLat([ long, lati ])
                .addTo(map)

            map.flyTo({ center: [ long, lati ] });
    
            currentMarker.push(marker);
            setCurrentMarkerCoords([ long, lati ]);
        }
    
        const clearMarker = () => currentMarker.forEach(marker => marker.remove())

        if (!map) initPage();

        // return () => clearTimeout(timeout);

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [loadingButton, setLoadingButton] = useState(false);
    
    const setNewFiles = files => setFiles(files);
    const setData = data => setTopData(data);
    const setLeftData = data => setBottomLeftData(data);
    const setRightData = data => setBottomRightData(data);

    const showMap = isLoading ? '0' : '1';

    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

    const submitForm = async() => {

        const addressObject = {
            property_address: topData[2],
            city: topData[4],
            country: topData[5],
            postal_code: topData[3],
        }

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

        if(props.from) addPropertyData.push({ type: 'photos', val: JSON.stringify(oldImages) });

        const requestData = new FormData();

        requestData.append('data', JSON.stringify(addPropertyData));

        files.map(file => requestData.append('image', file, file.name))

        setLoadingButton(true);
        const res = props.from ? await editProperty(propertyID, requestData) : await createProperty(requestData);
        setLoadingButton(false);

        // ====================== RESPONSE ======================
        if(res.status === 1) {
            if(props.from) toastr.success('Property edited successfully!');
            else toastr.success('Property created successfully!');
            history.push('/profile');
        } else return toastr.error(res.message);
    }

    const removeOldImage = image => setOldImages(oldImages.filter(img => img !== image));
    
    const buttonName = props.from ? 'Save Changes' : 'Add property';
    
    return (
        <React.Fragment>
                <div className="loading"><ClipLoader size={50} color={'#e83251'} loading={isLoading}/></div>
                <h1 className="AddPropertyTitle">Rent your place in no time!</h1>
                <div className="AddPropertyContainer" style={{ opacity: showMap }}>
                    <div className="FirstRow">
                        <div>
                            <AddEditHouseTop data={topData} setData={setData} />
                        </div>
                        <div className="MapContainer">
                            <h3>Pick your address: *</h3>
                            <div ref={addPropertyMap} className="addPropertyMap"></div>
                        </div>
                    </div>
                    <div className="SecondRow">
                        <div>
                            <AddEditHouseBottomLeft data={bottomLeftData} setData={setLeftData} />
                        </div>
                        { props.from && bottomRightData.length > 0
                            ? 
                            <div className="Facilities">
                                <AddEditHouseBottomRight data={bottomRightData} setData={setRightData} populate={bottomRightData} />
                            </div> 
                            : 
                            undefined
                        }

                        { !props.from
                            ? 
                            <div className="Facilities">
                                <AddEditHouseBottomRight data={bottomRightData} setData={setRightData} />
                            </div> 
                            : 
                            undefined
                        }
                        
                    </div>

                    { props.from 
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
                                                <img src={'https://holidayhouse1.s3.amazonaws.com/' + image} alt={'thumb-img'} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        undefined
                    }

                    <div className="ThirdRow">
                        <DragAndDrop files={files} setNewFiles={setNewFiles} />
                    </div>
                    
                    <div className="FourthRow">
                        <AddPropertyButton
                        variant="contained"
                        onClick={submitForm}> {loadingButton ? <ClipLoader size={18} color={'#fff'} /> : buttonName}</AddPropertyButton>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default AddProperty;