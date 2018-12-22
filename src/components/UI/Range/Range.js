import React, {Component} from 'react';

import classes from './Range.css'

class Range extends Component {
    state = {
        value: 50
    }

    render () {
        return (
            <div className={classes.Container}>
                <div className={classes.Texte}>
                    <span className={classes.Txt1}>Distance maximale</span>
                    <span className={classes.Txt2}>{this.state.value} km</span>
                </div>
                <div className={classes.Input}>         
                    <input 
                        type="range" 
                        stpe="1" 
                        value={this.state.value} 
                        onChange={(event) => this.setState({value:event.target.value})}
                        className={classes.Range}/>
                </div>
            </div>
        );
    }
}

export default Range;