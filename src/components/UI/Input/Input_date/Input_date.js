import React from 'react';

import classes from './Input_date.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const input_date = (props) => {
    return (
        <div className={classes.Container}>
            <FontAwesomeIcon icon={props.Icon} className={classes.Icon} />
            <input className={classes.Input} 
                type={props.Type} 
                placeholder={props.Name} 
                min={props.Min}
                max={props.Max}
                name={props.Type}
                onBlur={props.UpCase} 
                onFocus={props.Focus} 
                onChange={props.Change}
                value={props.Value}/>
        </div>
    );
}

export default input_date;