import React, { useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import classes from './DragAndDrop.module.css';
import DragDrop from './../../assets/img/drag_drop.svg';
import toastr from 'toastr';
import AddMoreImages from './AddMoreImages/AddMoreImages';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  borderRadius: 10,
  cursor: 'pointer',
  width: '100%'
};

const activeStyle = {
  borderColor: '#fe9303'
};

const acceptStyle = {
  borderColor: '#76ce8e'
};

const rejectStyle = {
  borderColor: '#E4215B'
};

const DragAndDrop = props => {
  // const [files, setFiles] = useState([]);
  const [hover, setHover] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    // eslint-disable-next-line
    acceptedFiles,
    open
  } = useDropzone({
    accept: 'image/*',
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      const newImages = acceptedFiles.filter(file => { 
        if(props.files.findIndex(propFile => propFile.name === file.name) === -1) 
          return Object.assign(file, { preview: URL.createObjectURL(file) } )
      });

      if(acceptedFiles.length !== newImages.length) toastr.warning('Only the new images will be added!', 'You uploaded duplicates!');

      let updateImages = [ ...props.files, ...newImages ];

      if(updateImages.length > 10) {
        updateImages = updateImages.filter((img, index) => index < 10);
        toastr.warning('Only the first 10 iamges will be kept!', 'Too many images!')
      }

      props.setNewFiles(updateImages);
    }
  });

  const toggleHover = () => {
    setHover(!hover);
  }

  const removeImage = index => {
    const newFiles = [ ...props.files ];
    newFiles.splice(index, 1);
    props.setNewFiles(newFiles);
  }

  const addImages = e => {
    const inputImages = Array.from(e.target.files);
    const newImages = inputImages.filter(file => { 
      if(props.files.findIndex(propFile => propFile.name === file.name) === -1) 
        return Object.assign(file, { preview: URL.createObjectURL(file) } )
    });

    if(inputImages.length !== newImages.length) toastr.warning('Only the new images will be added!', 'You uploaded duplicates!');

    let updateImages = [ ...props.files, ...newImages ];

    if(updateImages.length > 10) {
      updateImages = updateImages.filter((img, index) => index < 10);
      toastr.warning('Only the first 10 iamges will be kept!', 'Too many images!')
    }

    props.setNewFiles(updateImages);
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = props.files.map((file, index) => (
    <div className={classes.Thumb} key={file.name}>
      <span className={classes.CloseContainer} onClick={() => removeImage(index)}>
        <FontAwesomeIcon className={classes.CloseButton} icon={faTimes} />
      </span>
      <div className={classes.ThumbInner}>
        <img src={file.preview} alt={'thumb-img'} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      props.files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [props.files]
  );
  
  let onHoverStyle;
  if (hover) onHoverStyle = { transform: 'scale(1.05)', filter: 'brightness(1.12)', transition: '.5s' };
    else onHoverStyle = { transition: '.5s' };

  let onHoverText;
  if (hover) onHoverText = { color: '#222', transition: '.5s' };
    else onHoverText = { transition: '.5s' };

  return (
    <div className='container'>
      <div { ...getRootProps({ style }) } onClick={open} onMouseEnter={toggleHover} onMouseLeave={toggleHover} >
        <input { ...getInputProps() } />
        <p style={onHoverText} className={classes.DragInfo}>Click or Drag &amp; drop images</p>
        <img style={onHoverStyle} className={classes.DragDrop} src={DragDrop} alt={'drag-n-drop'} />
        <p style={onHoverText} className={classes.AcceptedFiles}>Accepted types: JPEG, JPG, PNG, SVG</p>
        <p style={onHoverText} className={classes.MaxFiles}>(max. 10 images)</p>
      </div>
      <span className={classes.ThumbsContainer}>
        {thumbs}
        {
          thumbs && thumbs.length > 0 && thumbs.length < 10
          ? 
          <AddMoreImages addImages={addImages} />
          : 
          undefined
        }
      </span>
      
    </div>
  );
}

export default DragAndDrop;