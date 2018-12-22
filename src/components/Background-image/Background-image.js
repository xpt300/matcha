import React from 'react';

import image from '../../assets/image/img.jpg';
import classes from './Background-image.css';

const backgroundimg = (props) => {
    return (
        <img src={image} className={classes.Bg}></img>
    );
}

export default backgroundimg;