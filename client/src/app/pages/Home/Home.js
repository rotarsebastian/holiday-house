import React, { useEffect, useState } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard'
// import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import { useSetAndDelete } from 'react-context-hook';
import Searchbar from '../../components/Searchbar/Searchbar';
import { useHistory, useLocation } from 'react-router-dom';
import { isUuid } from 'uuidv4';
import toastr from 'toastr';
import ClipLoader from 'react-spinners/ClipLoader';
import { getRecommendedProperties }  from './../../helpers/properties';
import { validateForm }  from './../../helpers/validation';
import { useStore, useStoreValue } from 'react-context-hook';

const Home = props => {

    const history = useHistory();
    const location = useLocation();

    const [ setShowModal ] = useSetAndDelete('showModal');
    const [ setRedirectTo ] = useSetAndDelete('redirectTo');
    const [ setChangeKey ] = useSetAndDelete('changeKey');
    const [ showPage, setShowPage ] = useState('0');    

    const [ recommendedProperties, setProperties ] = useState(undefined);

    const [ countLoadedImages, setCountLoadedImages ] = useStore('countLoadedImages');
    const user_data = useStoreValue('user');

    useEffect(() => {

        document.querySelector('body').classList.add('home');
        
        if(props.location.state !== undefined && props.location.state !== null) {
            const { pathname } = props.location.state.from;
            setRedirectTo(pathname);
            setShowModal('Log in');
            history.replace('', null);
        }

        const searchParams = new URLSearchParams(location.search);
        const key = searchParams.get('key'); 
        const activatedKey = searchParams.get('activated'); 
        const isExpired = searchParams.get('expired'); 

        if(isExpired && isExpired === 'true') {
            toastr.success('Your link has expired!');
            history.push('/');
        }

        if(activatedKey && isUuid(activatedKey)) {
            toastr.success('You can now login into your account', 'Your account is now activated!');
            history.push('/');
            setShowModal('Log in');
        }

        if(key && isUuid(key)) {
            setChangeKey(key);
            history.push('/');
            setShowModal('Change password');
        }
        
        const fetchRecoms = async() => {
            if(recommendedProperties === undefined) {
                const response = user_data ? await getRecommendedProperties(user_data.id) : await getRecommendedProperties();
                if(response.status === 1) setProperties(response.data);
                // else toastr.error('Something went wrong!');
            }
        }
        
        if(recommendedProperties === undefined) fetchRecoms();

        return () => document.querySelector('body').classList.remove('home');

    }, [props.location.state, setRedirectTo, setShowModal, history, location, setChangeKey, recommendedProperties, user_data]); 

    const showProperty = id => history.push(`/property/${id}`);

    const handleSearch = async(city, from, to, guests) => {
        const searchData = [ 
            { type: 'city', val: city }, { type: 'available_start', val: from }, 
            { type: 'available_end', val: to }, { type: 'guests', val: parseInt(guests) }
        ];

        const isFormValid = validateForm(searchData);
        if(!isFormValid.formIsValid) return toastr.error(`Invalid ${isFormValid.invalids.join(', ')}`);

        const queryString = `?from=${from}&to=${to}&guests=${guests}&city=${city}`;

        history.push(`/propertiesresults${queryString}`);
    }

    if(recommendedProperties === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>;

    if(showPage !== '1' && recommendedProperties && countLoadedImages === recommendedProperties.length) {
        setTimeout(() => setCountLoadedImages(0), 500); 
        setShowPage('1');
    } 

    return (
        <React.Fragment>
            <div className="loading"><ClipLoader size={50} color={'#E4215B'} loading={showPage === '1' ? false : true}/></div>

            <div style={{ opacity: showPage }}>
                <Searchbar clickSearch={handleSearch} />

                <div className="homeContainer">
                    <h1>What is your next destination?</h1>
                    <div className="slideshowContainer">
                        { recommendedProperties.map((property, index) => {
                            return <PropertyCard key={index} className="propertyCard" property={property} from={'Home'} click={showProperty} />
                        })}                                   
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;