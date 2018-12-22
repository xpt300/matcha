import React from 'react';

import classes from './ModalTransition.css';

const modalTransition = (props) => {

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

export default modalTransition;