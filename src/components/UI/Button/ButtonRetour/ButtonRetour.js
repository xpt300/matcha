import React from 'react';

import classes from './ButtonRetour.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aux from '../../../../hoc/Aux/Aux';

const buttonRetourn = (props) => {
    return (
        <Aux>
            <button className={classes.Button} onClick={props.click}>
                <FontAwesomeIcon icon='angle-left' className={classes.Icon} />{props.children}
            </button>
        </Aux>
    );
}

export default buttonRetourn;