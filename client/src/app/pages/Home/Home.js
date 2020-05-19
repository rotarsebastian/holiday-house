import React, { useRef, useEffect, useState } from 'react';
import ak from '../../assets/config';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';

const Home = props => {
    
    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(9.8694);    
    const [ lat, setLat ] = useState(52.3082);    
    const [ zoom, setZoom ] = useState(3.5);    
    const [ currentMarkers ] = useState([]);    
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
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom,
                attributionControl: false,
            });

            map.on('load', () => {
                const layersToRemove = ['country-label', 'state-label', 'settlement-label'];
                layersToRemove.forEach(layer => map.removeLayer(layer));
                map.addControl(new mapboxgl.GeolocateControl({
                    positionOptions: {
                        enableHighAccuracy: true
                    },
                    trackUserLocation: true
                }));
                setMap(map);
                map.resize();
                setIsLoading(false);
                // add markers to map
                addMarkers(map);
            });
        
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
            });

            map.on('zoom', () => {
                // if(Math.round(zoom * 10) / 10 < 3.5) hideMarkers();
                // else showMarkers(map);
            });
        };

        // const addMarkers = (map, properties) => {
        const addMarkers = (map) => {
            const properties = [ { coordinates: [ 12.57, 55.68 ], city: 'Copenhagen', price: 299 }, { coordinates: [ 13.57, 57.68 ], city: 'Copenhagen', price: 299 } ];
            // const properties = await getProperties();

            properties.forEach(async (property)=> {

                // create a HTML element for each feature
                const markerHTML = document.createElement('div');
                markerHTML.className = 'marker';
                markerHTML.textContent = `${property.price} DKK`;

                // make a marker for each feature and add to the map
                const oneMarker = new mapboxgl.Marker(markerHTML)
                    .setLngLat(property.coordinates)
                    .setPopup(new mapboxgl.Popup({ closeButton: false, offset: 20 })  
                        .setHTML(constructPopup(property)))
                    .addTo(map)
                    currentMarkers.push(oneMarker);

                // markerHTML.addEventListener('click', evt => evt.stopPropagation());
            });
        }

        const constructPopup = property => {
            return `<p>${property.city}</p>`
        }

        // const hideMarkers = () => {
        //     currentMarkers.forEach(marker => {
        //         marker.remove();
        //     });
        // }

        // const showMarkers = map => {
        //     currentMarkers.forEach(marker => {
        //         marker
        //             .setPopup(new mapboxgl.Popup({ closeOnClick: false, closeButton: false, anchor: 'center' })
        //                 .setHTML('<p>' + marker._popup._content.innerText.split('°C')[0] + '°C</p><h4>' + marker._popup._content.innerText.split('°C')[1].trim() + '</h4>'))
        //             .addTo(map)
        //             .togglePopup();
        //     });
        // }

        if (!map) initializeMap({ setMap, mapContainer });

    }, [map, lat, lng, zoom, currentMarkers]);

    const showMap = isLoading ? '0' : '1';

    return (
        <React.Fragment>
                <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div>

                <div className="homeContainer">
                    <div style={{ opacity: showMap }}>
                        <div ref={el => mapContainer.current = el} className="mapContainer" />
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Home;