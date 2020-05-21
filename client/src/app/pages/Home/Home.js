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

        console.log(props.location)
        if(props.location.state !== undefined && props.location.state !== null) {
            const { pathname } = props.location.state.from;
            // console.log(pathname)
            setRedirectTo(pathname) 
            setShowModal('Log in');
            history.replace('', null);
        }

    }, [props.location.state, setRedirectTo, setShowModal, history]); 
    
    return (
        <React.Fragment>
                {/* <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div> */}
                <SearchbarComponents />
                <div className="homeContainer">
                    <h1>What is your next destination?</h1>
                    <div className="slideshowContainer">
                        <div className="slider">Slider</div>
                        <div className="propertiesSlideshow">
                            <div className="propertiesCard">
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                            </div>
                            {/* <div className="propertiesCard">
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                                <PropertyCard />
                            </div> */}
                        </div>                  
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Home;