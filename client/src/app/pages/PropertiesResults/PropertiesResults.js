import React, { useRef, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ak from '../../assets/configFile';
import mapboxgl from 'mapbox-gl';
import ClipLoader from 'react-spinners/ClipLoader';
import './PropertiesResults.css';
import { getProperties }  from './../../helpers/properties';
import Searchbar from '../../components/Searchbar/Searchbar';
import PropertyCard from './../../components/PropertyCard/PropertyCard';
import { useStore } from 'react-context-hook';
// import toastr from 'toastr';

const PropertiesResults = props => {

    const history = useHistory();
    const location = useLocation();
    
    const [ properties, setProperties ] = useState(undefined);    
    const [ newProperties, setNewProperties ] = useState(undefined);    
    const [ showPage, setShowPage ] = useState('0');    
    // const [ offset, setOffset ] = useState(0);    

    const [ map, setMap ] = useState(undefined);    
    const [ lng, setLng ] = useState(12.5718);    
    const [ lat, setLat ] = useState(55.6466);    
    const [ zoom, setZoom ] = useState(10.48);    
    const [ currentMarkers ] = useState([]);    
    const [ isLoading, setIsLoading ] = useState(true);
    const [ populateSearch, setPopulateSearch ] = useState(undefined);
    const [ highlightProperty, setHighlightProperty ] = useState(undefined);

    const mapContainer = useRef(null);
    const [ countLoadedImages, setCountLoadedImages ] = useStore('countLoadedImages');

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
            if(res.status !== 1) {
                history.push('/');
            }
            else {
                const popSearchObj = { city, from, to, guests, maxPrice, minPrice, types };
                setPopulateSearch(popSearchObj);
                setProperties(res.properties);
                setNewProperties(res.properties.length)
            }
        }

        // ===================== FOR DEVELOPMENT =====================
        mapboxgl.accessToken = process.env.MAP_KEY || ak('map');

        const initializeMap = () => {
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

        if(properties === undefined) fetchProperties();
        if (!map && properties) initializeMap();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, lat, lng, zoom, currentMarkers, location, properties, history]);

    const addMarkers = (map, newProperties) => {
        const showProperties = newProperties ? newProperties : properties;

        showProperties.forEach(property => {

            // create a HTML element for each feature
            const markerHTML = document.createElement('div');
            const markerDIV = document.createElement('div');
            markerHTML.className = 'marker';
            markerDIV.className = `markerContainer marker-${property.id}`;
            markerDIV.textContent = `${property.price} kr`;
            markerHTML.appendChild(markerDIV);

            markerHTML.addEventListener('click', e => {
                clearActiveMarker();
                setTimeout(() => e.target.classList.add('active', 'visited'), 100);
            });

            markerHTML.addEventListener('mouseenter', () => setHighlightProperty(property.id));
            markerHTML.addEventListener('mouseleave', () => setHighlightProperty(undefined));

            let popup = new mapboxgl.Popup({ closeButton: false, offset: 20 });

            // make a marker for each feature and add to the map
            const oneMarker = new mapboxgl.Marker(markerHTML)
                .setLngLat(property.coordinates)
                .setPopup(popup.setHTML(constructPopup(property)))
                .addTo(map)
                currentMarkers.push(oneMarker);

            popup.on('close', () => clearActiveMarker());

            popup._content.children[0].addEventListener('click', () => openPropertyPage(property.id))

        });
    }

    const openPropertyPage = id => history.push(`/property/${id}?from=${populateSearch.from}&to=${populateSearch.to}&guests=${populateSearch.guests}`);

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

    const hideMarkers = () => currentMarkers.forEach(marker => marker.remove());

    const handleSearch = async(city, from, to, guests, minPrice, maxPrice, types) => {

        const parsedTypes = types.map(type => `types[]=${encodeURIComponent(type)}`);
        
        let result; 
        let queryString = `?from=${from}&to=${to}&guests=${guests}&city=${city}&minprice=${minPrice}&maxprice=${maxPrice}`; 

        if(types.length > 0 ) { 
            result = await getProperties(from, to, guests, city, 0, minPrice, maxPrice, parsedTypes);
            parsedTypes.map(type => queryString += `&${type}`);
        } else result = await getProperties(from, to, guests, city, 0, minPrice, maxPrice);

        const popSearchObj = { city, from, to, guests, maxPrice, minPrice, types };

        const newProperties = result.properties.filter(prop => properties.findIndex(p => p.id === prop.id) === -1).length;
        
        setNewProperties(newProperties);
        setProperties(result.properties);
        setShowPage('0');
        hideMarkers();
        addMarkers(map, result.properties);
        setPopulateSearch(popSearchObj);

        history.replace(`/propertiesresults${queryString}`);
    }

    const toggleHighlightMarker = (id, stop) => {
        if(stop) mapContainer.current.querySelector(`.markerContainer.marker-${id}`).classList.remove('active');
        else mapContainer.current.querySelector(`.markerContainer.marker-${id}`).classList.add('active');
    }

    if(showPage !== '1' && properties && countLoadedImages === newProperties) {
        setTimeout(() => setCountLoadedImages(0), 500); 
        setShowPage('1');
    } 

    return (
        <React.Fragment>
            <div className="loading"><ClipLoader size={50} color={'#E4215B'} loading={showPage === '1' ? false : true}/></div>

            <div className="PropertiesResults" style={{ opacity: showPage }}>
                <Searchbar clickSearch={handleSearch} withFilters={true} populateSearch={populateSearch} />
                <div className="MapResultsContainer">
                    <div className="PropertiesList">
                        {   !isLoading
                                ?
                                properties.map(property => {
                                    return (
                                        <React.Fragment key={property.id}>                                            
                                            <div style={{ opacity: showPage }} className="PropertyCard">
                                                <PropertyCard 
                                                    highlighted={highlightProperty} 
                                                    property={property} 
                                                    click={openPropertyPage} 
                                                    mouseOver={toggleHighlightMarker} 
                                                    mouseLeave={toggleHighlightMarker}  
                                                />
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                                :
                                undefined
                        }
                    </div>
                    <div ref={el => mapContainer.current = el} className="mapContainer" />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PropertiesResults;