import React from 'react';

import classes from './viewNotif.css'

const viewNotif = () => {
    return (
        <div className={classes.Flex}>
            <div className={classes.Flex2}>
                <div className={classes.Triangle}></div>
            </div>
            <div className={classes.viewNotif}></div>
        </div>
    );
}

export default viewNotif;