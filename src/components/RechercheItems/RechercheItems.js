import React, {Component} from 'react'

import classes from './RechercheItems.css';
import Aux from '../../hoc/Aux/Aux';

class RechercheItems extends Component {
    onDragStart = (e, id) => {
        console.log('transfer: ', id);
        e.dataTransfer.setData('id', id);
    }
    onDragOver = (e) => {
        e.preventDefault();
    }

    render () {
        return (
        <Aux>
            <div className={classes.Items}  
                draggable
                onDragStart={(e) => this.onDragStart(e, this.props.id)}
                onDrop ={(e) => this.props.onDrop(e, this.props.id)}>
            </div>
        </Aux>
        )
    }
}

export default RechercheItems;