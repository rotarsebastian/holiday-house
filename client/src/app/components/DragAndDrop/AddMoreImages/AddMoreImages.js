import React from 'react';
import classes from './AddMoreImages.module.css';

const AddMoreImages = props => {
    return (
        <span className={classes.AddMoreContainer}>
            <input 
              className={classes.HiddenInputFile} 
              type='file' 
              multiple='multiple' 
              accept='image/*'
              onChange={e => props.addImages(e)} />
          </span> 
    )
}

export default AddMoreImages;