import React, { useRef, useEffect, useState } from 'react';
import ak from '../../assets/config';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import './AddProperty.css';

const AddProperty = props => {
    
    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(12.5937767);    
    const [ lat, setLat ] = useState(55.657091699999995);    
    const [ zoom, setZoom ] = useState(15);    
    const [ currentMarker ] = useState([]);    
    const [ currentMarkerCoords, setCurrentMarkerCoords ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(true);
    const mapContainer = useRef(null);

    useEffect(() => {
        // ===================== FOR PRODUCTION =====================
        // mapboxgl.accessToken = process.env.REACT_APP_MAP;
        // ===================== END PRODUCTION =====================

        // ===================== FOR DEVELOPMENT =====================
        mapboxgl.accessToken = ak('map');
        // ===================== END DEVELOPMENT =====================

        const initializeMap = ({ setMap, mapContainer }) => {
            if ('geolocation' in navigator) { 
                navigator.geolocation.getCurrentPosition(position => {
                    addMap(position.coords.longitude, position.coords.latitude);
                }) 
            } else addMap();
        };

        const addMap = (longitude, latitude) => {
            const currentLng = longitude ? longitude : lng;
            const currentLat = latitude ? latitude : lat;

            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [ currentLng, currentLat ],
                zoom: zoom,
                attributionControl: false,
            });
    
            map.on('load', () => {
                const layersToRemove = ['country-label', 'state-label', 'settlement-label'];
                layersToRemove.forEach(layer => map.removeLayer(layer));

                map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true,
                        timeout: 2000 /* 2 sec */
                    },
                    trackUserLocation: true,
                    showAccuracyCircle: false,
                    showUserLocation: false,
                    
                })); 
                
                setTimeout(() => {
                    mapContainer.current.querySelector('.mapboxgl-ctrl-geolocate').addEventListener('click', () => {
                        setTimeout(() => addMarker(undefined, map, lng, lat), 2001);
                    });
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

        if (!map) initializeMap({ setMap, mapContainer });

    }, [map, lat, lng, zoom, currentMarker]);

    const showMap = isLoading ? '0' : '1';

    console.log(currentMarkerCoords);
    
    return (
        <React.Fragment>
                <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div>

                <div className="AddPropertyContainer">
                    <div style={{ opacity: showMap }}>
                        <div ref={el => mapContainer.current = el} className="mapContainer" />
                    </div>
                </div>
        </React.Fragment>
    )
}

export default AddProperty;