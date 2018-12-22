import React from 'react';

import classes from './Modal.css';

const modal = (props) => {

    let modal = (
    <div className={classes.PasswdErr}>
        {props.children}
    </div> );

    if (props.type === 'success') {
        
        modal= ( 
        <div className={classes.PasswdSuccess}>
            {props.children}
        </div>
        )
    }

    return (modal);
}

export default modal;