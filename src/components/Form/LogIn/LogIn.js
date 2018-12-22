import React, { Component } from 'react';

import classes from './LogIn.css';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../UI/Input/Input';
import ButtonRetour from '../../UI/Button/ButtonRetour/ButtonRetour';

class LogIn extends Component {
    state = {
        mail: null,
        password: null,
        verifMail: null,
        verifPasswd: null
    };

    mailHandleChange(event) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            this.setState({ verifMail: true });
        } else {
            this.setState({ verifMail: false });
        }
        this.setState({mail: event.target.value});
    }

    passwdlHandleChange(event) {
        this.setState({ password: event.target.value }, () => {
            if (this.state.password.length > 0) {
                this.setState({verifPasswd: true})
            } else {
                this.setState({verifPasswd: false})
            }
        });
    }

    focusHandler(type) {
        if (type === 'passwd') {
            this.setState({ afficherPasswd: true })
        } else if (type === 'mail') {
            this.setState({ afficherMail: true })
        }
    }

    render() {
        let styleBtn = { opacity: 0.33 };
        let disabled = false;

        if (this.state.verifMail && this.state.verifPasswd) {
            styleBtn = null;
            disabled = true;
        }

        return (
            <Aux>
                <form className={classes.Form} onSubmit={(e) => e.preventDefault()}>
                 <ButtonRetour click={this.props.retour}> Retour</ButtonRetour>
                    <label className={classes.Title}>Connectez-vous <span className={classes.Exclamation}>!</span></label>
                    <Input
                        Type='mail'
                        Icon='envelope'
                        Name='Mail'
                        Focus={() => this.focusHandler('mail')}
                        Change={(event) => this.mailHandleChange(event)}/>

                    <Input
                        Type='password'
                        Icon='unlock'
                        Name='Mot de passe'
                        Focus={() => this.focusHandler('passwd')}
                        Change={(event) => this.passwdlHandleChange(event)}/>
                    <button className={classes.Btn}
                        type="submit"
                        value="submit"
                        disabled={!disabled}
                        style={styleBtn} onClick={() => this.props.next(this.state.password, this.state.mail)}>Connexion</button>
                    <button className={classes.BtnPwd}
                        type="submit"
                        value="submit"
                        disabled={this.state.verifMail ? null : true}
                        style={this.state.verifMail ? null : styleBtn} 
                        onClick={() => this.props.mdp(this.state.mail)}>Mot de passe oublie?</button>
                </form>
            </Aux>
        );
    }
}

export default LogIn;