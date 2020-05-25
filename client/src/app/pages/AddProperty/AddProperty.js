import React, { useRef, useEffect, useState } from 'react';
import ak from '../../assets/config';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import './AddProperty.css';
import AddEditHouseTop from '../../components/AddEditComponents/AddEditHouseTop'
import AddEditHouseBottomLeft from '../../components/AddEditComponents/AddEditHouseBottomLeft'
import AddEditHouseBottomRight from '../../components/AddEditComponents/AddEditHouseBottomRight'

const AddProperty = props => {
    
    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(12.5937767);    
    const [ lat, setLat ] = useState(55.657091699999995);    
    const [ zoom, setZoom ] = useState(15);    
    const [ currentMarker ] = useState([]);    
    // eslint-disable-next-line
    const [ currentMarkerCoords, setCurrentMarkerCoords ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(true);
    const addPropertyMap = useRef(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // ===================== FOR DEVELOPMENT =====================
        // mapboxgl.accessToken = process.env.REACT_APP_MAP;
        mapboxgl.accessToken = ak('map');

        const initializeMap = () => {
            if ('geolocation' in navigator) { 
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
        
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
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

        if (!map) initializeMap({ setMap, addPropertyMap });

        // return () => clearTimeout(timeout);

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const setNewFiles = files => setFiles(files);

    const showMap = isLoading ? '0' : '1';
    
    return (
        <React.Fragment>
                <div className="loading"><ClipLoader size={50} color={'#e83251'} loading={isLoading}/></div>
                <h1 className="AddPropertyTitle">Rent your place in no time!</h1>
                <div className="AddPropertyContainer" style={{ opacity: showMap }}>
                    <div className="FirstRow">
                        <div><AddEditHouseTop /></div>
                        
                        <div ref={addPropertyMap} className="addPropertyMap"><h3>Pick your address: *</h3></div>
                    </div>

                    <div className="SecondRow">

                        <div><AddEditHouseBottomLeft /></div>
                        <div className="Facilities"><AddEditHouseBottomRight /></div>
                    </div>

                    <div className="ThirdRow">
                        <DragAndDrop files={files} setNewFiles={setNewFiles} />
                    </div>

                </div>
        </React.Fragment>
    )
}

export default AddProperty;