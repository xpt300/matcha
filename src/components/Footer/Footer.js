import React from 'react';

import classes from './Footer.css';

const footer = () => {
    return (
        <footer className={classes.Footer}>
            <p>Created by: 
                <span className={classes.Firstletter}> M</span>JOUBERT & 
                <span  className={classes.Firstletter}> A</span>CHIRAT</p>
        </footer>
    );
}

export default footer;