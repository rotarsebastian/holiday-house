import React from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard'
// import ClipLoader from 'react-spinners/ClipLoader';
import './Home.css';

const Home = props => {

    const properties = ['','','','','','','','','','','','','','',''];
    
    return (
        <React.Fragment>
                {/* <div className="loading"><ClipLoader size={50} color={'#485877'} loading={isLoading}/></div> */}

                <div className="homeContainer">
                    <h1>What is your next destination?</h1>
                    <div className="slideshowContainer">
                        { properties.map(property => {
                            return <PropertyCard className="propertyCard" home={'Home'} />
                        })}                                   
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Home;