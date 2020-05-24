import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ak from '../../assets/config';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import './PropertiesResults.css';
import { getProperties }  from './../../helpers/properties';
import Searchbar from '../../components/Searchbar/Searchbar';
import toastr from 'toastr';

const PropertiesResults = props => {

    const location = useLocation();
    
    const [ properties, setProperties ] = useState(undefined);    

    const [ map, setMap ] = useState(null);    
    const [ lng, setLng ] = useState(9.8694);    
    const [ lat, setLat ] = useState(52.3082);    
    const [ zoom, setZoom ] = useState(3.5);    
    const [ currentMarkers ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(true);
    const [ populateSearch, setPopulateSearch ] = useState(undefined);
    const mapContainer = useRef(null);

    useEffect(() => {
        const fetchProperties = async() => {
            // ====================== GET SEARCH DATA ======================
            const searchParams = new URLSearchParams(location.search);
            const from = searchParams.get('from'); 
            const to = searchParams.get('to'); 
            const city = searchParams.get('city'); 
            const guests = searchParams.get('guests'); 
            const maxPrice = searchParams.get('maxprice'); 
            const minPrice = searchParams.get('minprice'); 
            const types = location.search.split('&').filter(el => el.includes('types[]'));

            const res = await getProperties(from, to, parseInt(guests), city, 0, minPrice, maxPrice, types);
            if(res.status !== 1) return toastr.error('Something went wrong!');
            else setProperties(res.properties);

            const popSearchObj = { city, from, to, guests, maxPrice, minPrice, types };
            setPopulateSearch(popSearchObj);
        }

        // ===================== FOR DEVELOPMENT =====================
        mapboxgl.accessToken = process.env.MAP_KEY || ak('map');

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

            properties.forEach(async (property)=> {

                // create a HTML element for each feature
                const markerHTML = document.createElement('div');
                const markerDIV = document.createElement('div');
                markerHTML.className = 'marker';
                markerDIV.className = 'markerContainer';
                markerDIV.textContent = `${property.price} kr`;
                markerHTML.appendChild(markerDIV);

                markerHTML.addEventListener('click', e => {
                    clearActiveMarker();
                    setTimeout(() => e.target.classList.add('active', 'visited'), 100);
                });

                let popup = new mapboxgl.Popup({ closeButton: false, offset: 20 });

                // make a marker for each feature and add to the map
                const oneMarker = new mapboxgl.Marker(markerHTML)
                    .setLngLat(property.coordinates)
                    .setPopup(popup.setHTML(constructPopup(property)))
                    .addTo(map)
                    currentMarkers.push(oneMarker);

                popup.on('close', () => clearActiveMarker());

                // markerHTML.addEventListener('click', evt => evt.stopPropagation());
            });
        }

        const clearActiveMarker = () => {
            Array.from(mapContainer.current.querySelectorAll('.markerContainer')).find(e => e.classList.contains('active') ? e.classList.remove('active') : false);
        }

        const constructPopup = property => {
            const popUpContainer = document.createElement('div');
            popUpContainer.className = 'PopupContainer';
            
            const popUpBottomContainer = document.createElement('div');
            popUpBottomContainer.className = 'PopupBottomContainer';

            const popUpImage = document.createElement('img');
            const popUpType = document.createElement('div');
            const popUpTitle = document.createElement('div');
            const popUpPrice = document.createElement('div');

            popUpImage.setAttribute('src', `https://holidayhouse1.s3.amazonaws.com/${property.photos[0]}`);
            popUpImage.setAttribute('alt', 'house-img');
            popUpImage.className = 'PopupImage';
            popUpType.textContent = property.type;
            popUpType.className = 'PopupType';
            popUpTitle.textContent = property.title;
            popUpTitle.className = 'PopupTitle';
            popUpPrice.innerHTML = property.price + ' kr <span>/ night<span>';
            popUpPrice.className = 'PopupPrice';

            popUpBottomContainer.appendChild(popUpType);
            popUpBottomContainer.appendChild(popUpTitle);
            popUpBottomContainer.appendChild(popUpPrice);

            popUpContainer.appendChild(popUpImage);
            popUpContainer.appendChild(popUpBottomContainer);

            return popUpContainer.outerHTML;
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

        if(properties === undefined) fetchProperties();
        if (!map && properties) initializeMap({ setMap, mapContainer });

    }, [map, lat, lng, zoom, currentMarkers, location, properties]);

    const handleSearch = async(city, from, to, guests) => {
        console.log('make req');
    }

    const showMap = isLoading ? '0' : '1';

    return (
        <React.Fragment>
            <div className="loading"><ClipLoader size={50} color={'#E4215B'} loading={isLoading}/></div>

            <div className="PropertiesResults" style={{ opacity: showMap }}>
                <Searchbar clickSearch={handleSearch} withFilters={true} populateSearch={populateSearch} />
                <div className="MapResultsContainer">
                    <div className="PropertiesList">List</div>
                    <div ref={el => mapContainer.current = el} className="mapContainer" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PropertiesResults;