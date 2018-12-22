import React, {Component} from 'react';

import classes from './RangeAge.css';
import ReactSlider from 'react-slider';


class Range extends Component {
    state = {
        value: {
            min: 25,
            max: 30
        }
    }

    onSliderMove = (elem) => {
        this.setState({value: {min: elem[0], max: elem[1]}});
    }

    render () {
        return (
            <div className={classes.Container}>
                <div className={classes.Texte}>
                    <span className={classes.Txt1}>Tranche D'âge</span>
                    <span className={classes.Txt2}>{this.state.value.min}-{this.state.value.max}</span>
                </div>
                <div className={classes.Input}>         
                    {/* <input 
                        type="range" 
                        value={this.state.value.max} 
                        onChange={(event) => this.setState({value: {max:event.target.value}})}
                        className={classes.Range}/> */}
                <ReactSlider className={classes.Range} handleClassName={classes.Handle} defaultValue={[this.state.value.min, this.state.value.max]} onChange={this.onSliderMove.bind(this)} withBars/>
                </div>
            </div>
        );
    }
}

export default Range;