import React, {Component} from 'react';

import classes from './AllReglage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class AllReglage extends Component {
    state = {
        genre: 'man',
        target: 'women'
    }

    handleGenre = (event) => {
        this.setState({genre: event.target.value});
    }

    handleTarget = (event) => {
        this.setState({target: event.target.value});
    }

    geolocalisation = () => {
        const token = {
            token: sessionStorage.getItem('jwtToken')
        }
        axios.post('http://localhost:8000/recherche/geolocalisation', token)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        return (
            <div className={classes.AllReglage}>
                <div className={classes.Radio}>
                    <label className={classes.Text}>Que recherchez-vous <span className={classes.Exclamation}>?</span></label>
                    <div className={classes.Lab}>
                        <input className={classes.Input} id="man1" type="radio" value="man" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'man'}/>
                        <label className={classes.Label} htmlFor="man1">Homme</label>

                        <input className={classes.Input} id="women1" type="radio"  value="women" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'women'}/>
                        <label className={classes.Label} htmlFor="women1">Femme</label>

                        <input className={classes.Input} id="other1" type="radio" value="other" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'other'}/>
                        <label className={classes.Label} htmlFor="other1">Autre</label>
                    </div>
                </div>
                <div className={classes.Map}>
                    <label className={classes.Text}>Géolocalise toi <span className={classes.Exclamation}>!</span></label>
                    <div className={classes.Circle} onClick={() => this.geolocalisation()}>
                        <FontAwesomeIcon icon="map-marker-alt" className={classes.IconMap} size="2x"/>
                    </div>
                </div>
                <div className={classes.IconDiv}>
                    <FontAwesomeIcon icon="angle-up" onClick={this.props.clickOn} className={classes.Icon} size="2x"/>
                </div>
            </div>
        );
    }
};

export default AllReglage;