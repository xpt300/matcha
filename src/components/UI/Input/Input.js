import React, {Component} from 'react';

import classes from './Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class input extends Component {
    render () {
        return (
            <div className={classes.Container}>
                <FontAwesomeIcon icon={this.props.Icon} className={classes.Icon} />
                <input className={classes.Input} 
                    type={this.props.Type} 
                    placeholder={this.props.Name} 
                    name={this.props.Type}
                    onBlur={this.props.UpCase} 
                    onFocus={this.props.Focus} 
                    onChange={this.props.Change}
                    value={this.props.Value}/>
            </div>
        );

    }
}

export default input;