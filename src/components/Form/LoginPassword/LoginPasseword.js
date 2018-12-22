import React, { Component } from 'react';

import classes from './LoginPassword.css';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import ModalTransition from '../../UI/Modal/ModalTransition/ModalTransition';
import FacebookLogin from 'react-facebook-login';
import Local from '../../../../env.js';

class Loginpassword extends Component {
    state = {
        mail: null,
        password: {
            password: null,
            lettre: 0,
            Majuscule: 0,
            chiffre: 0,
        },
        verifPasswd: null,
        afficherPasswd: null,
        verifMail: null,
        afficherMail: null,
        afficherPasswd2: null,
        verifPasswd2: null
    };

    mailHandleChange(event) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            this.setState({ verifMail: true });
        } else {
            this.setState({ verifMail: false });
        }
        this.setState({ mail: event.target.value });
    }

    passwdlHandleChange(event) {
        if (this.props.mail) {
            this.setState({ verifMail: true });
            this.setState({ mail: this.props.mail })
        }
        this.setState({ password: { password: event.target.value } });
        const passwd = event.target.value;
        const nbr = passwd.length;
        const Majuscule = passwd.match(/[A-Z]/g);
        const chiffre = passwd.match(/[0-9]/g);
        let MajusculeNbr = 0;
        let chiffreNbr = 0;
        if (Majuscule) {
            MajusculeNbr = Majuscule.length;
        }
        if (chiffre) {
            chiffreNbr = chiffre.length;
        }
        this.setState({
            password: {
                password: passwd,
                lettre: nbr,
                Majuscule: MajusculeNbr,
                chiffre: chiffreNbr,
            }
        });
        if (nbr > 7 && MajusculeNbr >= 1 && chiffreNbr > 4) {
            this.setState({ verifPasswd: true });
        } else {
            this.setState({ verifPasswd: false });
        }
    }

    focusHandler(type) {
        if (type === 'passwd') {
            this.setState({ afficherPasswd: true })
        } else if (type === 'mail') {
            this.setState({ afficherMail: true })
        } else if (type === 'passwd2') {
            this.setState({ afficherPasswd2: true })
        }
    }

    blurHandler(type) {
        if (type === 'passwd') {
            this.setState({ afficherPasswd: false })
        } else if (type === 'mail') {
            this.setState({ afficherMail: false })
        } else if (type === 'passwd2') {
            this.setState({ afficherPasswd2: false })
        }
    }

    confirm(event) {
        const passwd = event.target.value;
        const passwdToCheck = this.state.password.password;
        if (passwd === passwdToCheck) {
            this.setState({ verifPasswd2: true });
        } else {
            this.setState({ verifPasswd2: false });
        }
    }

    render() {
        let passwd = null;
        let mail = null;
        let passwd2 = null;
        let styleBtn = { opacity: 0.33 };
        let disabled = false;
 
        if (this.state.verifMail && this.state.verifPasswd && this.state.verifPasswd2) {
            styleBtn = null;
            disabled = true;
        }

        if (this.state.afficherPasswd2) {
            if (!this.state.verifPasswd2) {
                passwd2 =
                    <ModalTransition>
                        <p style={{ color: '#FF1493' }}>Le mot de passe de correspond pas</p>
                    </ModalTransition>
            }
        }

        if (this.state.afficherMail) {

            let colorMail = { color: '#FF1493' };
            if (this.state.verifMail) {
                colorMail = { color: 'green' };
            }
            mail =
                <ModalTransition>
                    <p style={colorMail}>Mail invalide</p>
                </ModalTransition>
        }

        if (this.state.afficherPasswd) {
            let colorLettre = { color: '#FF1493' }
            let colorMaj = { color: '#FF1493' }
            let colorNbr = { color: '#FF1493' }

            if (this.state.password.lettre > 7) {
                colorLettre = { color: 'green' }
            }

            if (this.state.password.Majuscule >= 1) {
                colorMaj = { color: 'green' }
            }

            if (this.state.password.chiffre > 4) {
                colorNbr = { color: 'green' }
            }

            passwd = (
                <ModalTransition>
                    <p style={colorLettre}>Il faut au moins 8 lettres</p>
                    <p style={colorMaj}>Il faut au moins 1 Majuscule</p>
                    <p style={colorNbr}>Il faut au moins 5 chiffres</p>
                </ModalTransition>
            )
        }
        return (
            <Aux>
                {passwd2}
                {mail}
                {passwd}
                <form className={classes.Form} onSubmit={(e) => e.preventDefault()}>
                    <label className={classes.Label}>Une rencontre n'attend pas <span className={classes.Exclamation}>!</span></label>
                    <Input
                        Type='mail'
                        Icon='envelope'
                        Name={this.props.mail ? this.props.mail : 'Mail'}
                        UpCase={() => this.blurHandler('mail')}
                        Focus={() => this.focusHandler('mail')}
                        Change={(event) => this.mailHandleChange(event)} />

                    <Input
                        Type='password'
                        Icon='unlock'
                        Name='Mot de passe'
                        UpCase={() => this.blurHandler('passwd')}
                        Focus={() => this.focusHandler('passwd')} passwd
                        Change={(event) => this.passwdlHandleChange(event)} />

                    <Input
                        Type='password'
                        Icon='check-double'
                        Name='Confirmez mot de passe'
                        UpCase={() => this.blurHandler('passwd2')}
                        Focus={() => this.focusHandler('passwd2')} passwd
                        Change={(event) => { this.confirm(event) }} />

                    <button className={classes.Btn}
                        type="submit"
                        value="submit"
                        disabled={!disabled}
                        style={styleBtn} onClick={() => this.props.next(this.state.password.password, this.state.mail)}>Suivant</button>
                    <Button click={this.props.log}>Log in</Button>
                    <div id={classes.Facebook}>
                        <FacebookLogin
                            appId={Local.API_SECRET}
                            fields="last_name,first_name,picture.type(large),email"
                            onClick={this.FacebookClicked}
                            icon="fa-facebook"
                            callback={(response) => this.props.responseFacebook(response)} />
                    </div>
                </form>
            </Aux>
        );
    }
}

export default Loginpassword;