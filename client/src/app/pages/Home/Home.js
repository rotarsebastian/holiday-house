import React, { useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard'
// import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import { useSetAndDelete } from 'react-context-hook';
import { useHistory } from 'react-router-dom';
import SearchbarComponents from '../../components/Searchbar/Searchbar'

const Home = props => {

    const history = useHistory();

    const [setShowModal] = useSetAndDelete('showModal');
    const [setRedirectTo] = useSetAndDelete('redirectTo');

    useEffect(() => {
        // history.replace('', null);

        document.querySelector('body').classList.add('home');
        
        if(props.location.state !== undefined && props.location.state !== null) {
            const { pathname } = props.location.state.from;
            setRedirectTo(pathname) 
            setShowModal('Log in');
            history.replace('', null);
        }

        return () => document.querySelector('body').classList.remove('home');

    }, [props.location.state, setRedirectTo, setShowModal, history]); 

    const properties = [
        {
            "id": 1,
            "title": "Beautiful 4 rooms studio",
            "description": "description for - Beautiful 4 rooms studio",
            "available_start": "2019-04-10T22:00:00.000Z",
            "available_end": "2022-04-10T22:00:00.000Z",
            "price": 999,
            "capacity": 4,
            "type": "Entire place",
            "rooms": 3,
            "beds": 3,
            "bathrooms": 2,
            "address": {
                "property_address": "mjolnerparken 108, 1. 3",
                "city": "berlin",
                "country": "germany",
                "postal_code": "2300"
            },
            "photos": [
                "default.jpeg"
            ],
            "user_id": 1,
            "created_at": "2020-05-19T10:00:33.552Z"
        },
        {
            "id": 2,
            "title": "Beautiful 5 rooms studio",
            "description": "description for - Beautiful 5 rooms studio",
            "available_start": "2020-06-10T22:00:00.000Z",
            "available_end": "2020-07-10T22:00:00.000Z",
            "price": 399,
            "capacity": 4,
            "type": "Entire place",
            "rooms": 3,
            "beds": 3,
            "bathrooms": 2,
            "address": {
                "property_address": "mjolnerparken 108, 1. 3",
                "city": "berlin",
                "country": "germany",
                "postal_code": "2300"
            },
            "photos": [
                "default.jpeg"
            ],
            "user_id": 1,
            "created_at": "2020-05-19T10:00:33.552Z"
        },
        {
            "id": 3,
            "title": "Beautiful 3 rooms studio",
            "description": "description for - Beautiful 3 rooms studio",
            "available_start": "2020-06-10T22:00:00.000Z",
            "available_end": "2020-07-10T22:00:00.000Z",
            "price": 399,
            "capacity": 4,
            "type": "Studio",
            "rooms": 3,
            "beds": 3,
            "bathrooms": 2,
            "address": {
                "property_address": "mjolnerparken 108, 1. 3",
                "city": "copenhagen",
                "country": "denmark",
                "postal_code": "2300"
            },
            "photos": [
                "default.jpeg"
            ],
            "user_id": 1,
            "created_at": "2020-05-19T10:00:33.552Z"
        },
        {
            "id": 4,
            "title": "Room in 6 room apartment",
            "description": "description for - Room in 6 room apartment",
            "available_start": "2020-04-10T22:00:00.000Z",
            "available_end": "2021-04-10T22:00:00.000Z",
            "price": 799,
            "capacity": 8,
            "type": "Entire place",
            "rooms": 6,
            "beds": 6,
            "bathrooms": 3,
            "address": {
                "property_address": "amagerbrogade 172, 1. 3",
                "city": "copenhagen",
                "country": "denmark",
                "postal_code": "2300"
            },
            "photos": [
                "default.jpeg"
            ],
            "user_id": 1,
            "created_at": "2020-05-19T10:00:33.552Z"
        }
    ]

    const showProperty = id => {
        console.log(id)
    }
    
    return (
        <React.Fragment>
                {/* <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div> */}
                <SearchbarComponents />
                <div className="homeContainer">
                    <h1>What is your next destination?</h1>
                    <div className="slideshowContainer">
                        { properties.map((property,index) => {
                            return <PropertyCard key={index} className="propertyCard" home={'Home'} property={property} click={showProperty} />
                        })}                                   
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Home;