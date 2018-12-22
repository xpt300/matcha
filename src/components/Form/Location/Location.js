import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './Location.css';
import AlgoliaPlaces from 'algolia-places-react';
import ButtonRetour from '../../UI/Button/ButtonRetour/ButtonRetour';


class Location extends Component {
    state = {
        address: null,
        postcode: null,
        country: null,
        latitude: null,
        longitude: null,
        ville: null
    };

    success = (sug) => {
        this.setState({
            latitude: sug.suggestion.latlng.lat,
            longitude: sug.suggestion.latlng.lng,
            postcode: sug.suggestion.postcode,
            country: sug.suggestion.country,
            address: sug.suggestion.name,
            ville: sug.suggestion.city
        })
    }

    error = (err) => {
        console.log(err);
    }

    render() {
        let styleBtn = { opacity: 0.33 };
        let disabled = false;
        if (this.state.address) {
            styleBtn = null;
            disabled = true;
        }
        return (
            <Aux>
                <form className={classes.Form} onSubmit={(event) => event.preventDefault()}>
                    <ButtonRetour click={this.props.retour}> Retour</ButtonRetour>
                    <label className={classes.Title}>D'où êtes vous <span className={classes.Exclamation}>?</span></label>
                    <AlgoliaPlaces
                        options={{
                            appId: 'plN4NIOVJN7X',
                            apiKey: '6b84e6759447fe75ab24428384c05f01',
                            type: 'address'
                        }}
                    
                        onChange={(suggestion) => this.success(suggestion)}>
                    </AlgoliaPlaces>
                    <button className={classes.Btn}
                        type='button'
                        value="submit"
                        disabled={!disabled}
                        style={styleBtn}
                        onClick={() => this.props.next(this.state)}>Suivant
                    </button>
                </form>
            </Aux>
        );
    }
}

export default Location;