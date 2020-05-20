import React from 'react';
import classes from './PropertyDetails.module.css'


const PropertyDetails = (props) => {
    return (
        <div className={classes.PropertyDetailsContainer}>
            <div>Entire house</div>
            <div>Beautiful house by the beach</div>
            <div>2 guests 1 bedroom 1bed 1bath</div>
            <div>
                <div>Description</div>
                <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</div>
            </div>
            <div>
                <div>Address</div>
                <div>Lorem Ipsum is simply dummy text of the printing and </div>
            </div>
            <div>
                <div>Facilities</div>
                <div>Kitchen Free Parking Washer Wifi</div>
            </div>
            <div>
                <div>Hosted by</div>
                <div>Andreea Steriu</div>
            </div>
            <div>
                <button>Book it</button>
                <div>
                    <div>200 DKK/ night</div>
                    <div>3000 DKK total</div>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetails