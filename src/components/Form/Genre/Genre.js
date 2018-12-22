import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import classes from './Genre.css';
import Input from '../../UI/Input/Input';
import InputDate from '../../UI/Input/Input_date/Input_date';
import ModalTransition from '../../UI/Modal/ModalTransition/ModalTransition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonRetour from '../../UI/Button/ButtonRetour/ButtonRetour';

class Genre extends Component {
    state = {
        afficherAnniv: false,
        afficherPrenom: false,
        afficherNom: false,
        prenom: {
            prenom: null,
            letter: 0
        },
        nom: {
            nom: null,
            letter: 0
        },
        date: {
            date: null,
            valid: false
        },
        valid: false,
        genre: 'man',
        target: 'women'
    }

    handleGenre = (event) => {
        this.setState({genre: event.target.value});
    }


    handleTarget = (event) => {
        this.setState({target: event.target.value});
    }

    annivHandleChange(event) {
        const date = event.target.value;
        if (date) {
            let table = date.split('-');
            if (table[0] >= 1920 && table[0] < 2019) {
                this.setState({date: { date: date, valid: true}, afficherAnniv: false});
            }
        }
    }

    prenomHandleChange(event) {
        this.setState({prenom: {prenom: event.target.value, letter: event.target.value.length}})
        if (this.state.prenom.letter > 0) {
            this.setState({ afficherPrenom: false })
        }
    }

    nomHandleChange(event) {
        this.setState({nom: {nom: event.target.value, letter: event.target.value.length}})
        if (this.state.nom.letter > 0) {
            this.setState({ afficherNom: false })
        }
    }

    focusHandler(type) {
        if (type === 'prenom' && this.state.prenom.letter < 1) {
            this.setState({ afficherPrenom: true })
        } else if (type === 'nom' && this.state.nom.letter < 1) {
            this.setState({ afficherNom: true })
        } else if (type === 'anniv') {
            this.setState({ afficherAnniv: true })
        }
    }

    blurHandler(type) {
        if (type === 'anniv') {
            this.setState({ afficherAnniv: false })
        } else if (type === 'nom') {
            this.setState({ afficherNom: false })
        } else if (type === 'prenom') {
            this.setState({ afficherPrenom: false })
        }
    }

    render() {
        let prenom = null;
        let nom = null;
        let anniv = null;
        let styleBtn = { opacity: 0.33 };
        let disabled = false;

        
        if (this.state.afficherAnniv) {
            let str = <p type='null'>La date entrée n'est pas valide</p>
            if (this.state.date.valid) {
                str = <p type='success'>La date est valide
                                <FontAwesomeIcon icon='grin' className={classes.Icon} /></p>
            }
            anniv = 
                <ModalTransition>
                    {str}
                </ModalTransition>
        }
        
        if (this.state.afficherNom) {
            nom = 
                <ModalTransition>
                    <p type='null'>Vous n'avez pas de Nom  
                            ? <FontAwesomeIcon icon='grin-beam-sweat' className={classes.Icon} /></p>
                </ModalTransition>
        }
        
        if (this.state.afficherPrenom) {
            prenom = 
                <ModalTransition>
                    <p type='null'>Vous n'avez pas de Prenom  
                            ? <FontAwesomeIcon icon='grin-beam-sweat' className={classes.Icon} /></p>
                </ModalTransition>
        }
        
        if (!this.state.afficherAnniv && !this.state.afficherNom && !this.state.afficherPrenom && this.state.date.valid) {
            styleBtn = null;
            disabled = true;
        }
        return (
            <Aux>
                {anniv}
                {nom}
                {prenom}
                <form className={classes.Form} onSubmit={(event) => event.preventDefault()}>
                    <ButtonRetour click={this.props.retour}> Retour</ButtonRetour>
                    <label className={classes.Title}>Qui êtes-vous <span className={classes.Exclamation}>?</span></label>
                        <Input
                            Type='text'
                            Icon='id-card'
                            Name={this.props.prenom ? this.props.prenom : 'Prenom'}
                        UpCase={() => this.blurHandler('prenom')}
                        Focus={() => this.focusHandler('prenom')}
                        Change={(event) => this.prenomHandleChange(event)} 
                        />

                        <Input
                            Type='text'
                            Icon='id-badge'
                            Name={this.props.nom ? this.props.nom : 'Nom'}
                        UpCase={() => this.blurHandler('nom')}
                        Focus={() => this.focusHandler('nom')}
                        Change={(event) => this.nomHandleChange(event)} 
                        />

                        <InputDate 
                            Type='date'
                            Icon='calendar'
                            Name='Anniversaire'
                            Min='1920-01-01'
                            Max='2999-12-31'
                            UpCase={() => this.blurHandler('anniv')}
                            Focus={() => this.focusHandler('anniv')}
                            Change={(event) => this.annivHandleChange(event)} 
                        />
                    
                    <div className={classes.Radio}>
                        <input className={classes.Input} id="man" value="man" type="radio" name="radio" onChange={(e)=> this.handleGenre(e)} checked={this.state.genre === 'man'}/>
                        <label className={classes.Label} htmlFor="man">Homme</label>

                        <input className={classes.Input} id="women" value="women" type="radio" name="radio" onChange={(e)=> this.handleGenre(e)} checked={this.state.genre === 'women'}/>
                        <label className={classes.Label} htmlFor="women">Femme</label>

                        <input className={classes.Input} id="other" value="other" type="radio" name="radio" onChange={(e)=> this.handleGenre(e)} checked={this.state.genre === 'other'}/>
                        <label className={classes.Label} htmlFor="other">Autre</label>
                    </div>
                    <label className={classes.Text}>Que recherchez-vous <span className={classes.Exclamation}>?</span></label>
                    <div className={classes.Radio}>
                        <input className={classes.Input} id="man1" type="radio" value="man" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'man'}/>
                        <label className={classes.Label} htmlFor="man1">Homme</label>

                        <input className={classes.Input} id="women1" type="radio"  value="women" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'women'}/>
                        <label className={classes.Label} htmlFor="women1">Femme</label>

                        <input className={classes.Input} id="other1" type="radio" value="other" name="radio1" onChange={(e)=> this.handleTarget(e)} checked={this.state.target === 'other'}/>
                        <label className={classes.Label} htmlFor="other1">Autre</label>
                    </div>
                    <button className={classes.Btn}
                        type="submit"
                        value="submit"
                        disabled={!disabled}
                        style={styleBtn} 
                        onClick={() => this.props.next(this.state.prenom.prenom, this.state.nom.nom, this.state.date.date, this.state.genre, this.state.target)}>Suivant</button>
                </form>
            </Aux>
        );
    }
}

export default Genre;