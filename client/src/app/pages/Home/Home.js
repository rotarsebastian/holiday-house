import React, { useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard'
// import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';
import { useSetAndDelete } from 'react-context-hook';
import { useHistory } from 'react-router-dom';

const Home = props => {

    const history = useHistory();

    const [setShowModal] = useSetAndDelete('showModal');
    const [setRedirectTo] = useSetAndDelete('redirectTo');

    useEffect(() => {
        // history.replace('', null);
        
        if(props.location.state !== undefined && props.location.state !== null) {
            const { pathname } = props.location.state.from;
            setRedirectTo(pathname) 
            setShowModal('Log in');
            history.replace('', null);
        }
    }, [props.location.state, setRedirectTo, setShowModal, history]); 

    const properties = ['','','','','','','','','','','','','','',''];
    
    return (
        <React.Fragment>
                {/* <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div> */}

                <div className="homeContainer">
                    <h1>What is your next destination?</h1>
                    <div className="slideshowContainer">
                        { properties.map((property,index) => {
                            return <PropertyCard key={index} className="propertyCard" home={'Home'} />
                        })}                                   
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Home;