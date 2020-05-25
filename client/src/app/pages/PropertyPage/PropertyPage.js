import React, { useState, useEffect } from "react";
import classes from './PropertyPage.module.css';
import SlideShow from '../../components/SlideShow/SlideShow';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails'
import { getOneProperty }  from './../../helpers/properties';
import toastr from 'toastr';
import ClipLoader from 'react-spinners/ClipLoader';

const Property = props => {
    
    // const user_data = useStoreValue('user');
    const [property, setProperty] = useState(undefined);
    
    useEffect(() => {
        const id = window.location.pathname.split('/')[2];
        const fetchProperty = async() => {
            if(property === undefined) {
                const response = await getOneProperty(id);
                if(response.status === 1) setProperty(response.data);
                    else toastr.error('Something went wrong!');
            }
        }

       fetchProperty();
    }, [property]) // component didmount - []  || componentWillUpdate - [yourDependency]
    
    const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);

    if(property === undefined) return <div className="loading"><ClipLoader size={50} color={'#e83251'} /></div>

    const { description } = property;
    const facilities = property.facilities !== null ? JSON.parse(property.facilities.facilities_list) : undefined;

    return (
        <React.Fragment>
            <div className={classes.PropertyTopContainer}>
                <SlideShow photos={property.photos} />
                <PropertyDetails property={property} from={props.history.location.state} />
            </div>

            <div className={classes.PropertyBottomContainer}>
                <div>
                    <div className={classes.PropertyAttrTitle}>Description</div>
                    <div className={classes.PropertyAttrText}>{capitalize(description)}</div>
                </div>

                {
                    facilities 
                    ? 
                    <div>
                        <div  className={classes.PropertyAttrTitle}>Facilities</div>
                        <div className={classes.PropertyAttrText}>
                            {
                                facilities.map((facility, index) => {
                                    return (
                                        <div key={index}>
                                            { facility.icon.slice(-4) !== '.svg' 
                                                ? 
                                                <i className={'fas fa-' + facility.icon}></i> 
                                                : 
                                                <img className={classes.Icon} src={'https://holidayhouse1.s3.amazonaws.com/icons/' + facility.icon} alt={facility.icon} />
                                            }
                                            <div>{ facility.name }</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    : 
                    undefined
                }

            </div>

        </React.Fragment>
    )
}

export default Property;