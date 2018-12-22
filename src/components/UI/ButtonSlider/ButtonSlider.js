import React, {Component} from 'react';

import classes from './ButtonSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ButtonSlider extends Component {
    onDragOver = (e) => {
        e.preventDefault();
    }

    render () {
        return (
            <div className={classes.Circle} 
                onClick={this.props.clickMove} 
                onDragOver = {(e) => this.onDragOver(e)} 
                onDrop = {(e) => this.props.onDrop(e, this.props.button)}>
                {this.props.button === 'like' ? <FontAwesomeIcon icon="heart" className={classes.Icon1} size="2x"/> : <span className={classes.NotLike}>X</span>}
            </div>
        )
    }
}

export default ButtonSlider;