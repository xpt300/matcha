import React, { Component } from 'react';

import classes from './Reinitialisation.css';
import Input from '../../components/UI/Input/Input';
import axios from 'axios';
import * as account from '../../store/actions/index';
import { connect } from 'react-redux';
import Background from '../../components/Background-image/Background-image';
import Layout from '../../components/Layout/Layout';
import Aux from '../../hoc/Aux/Aux'

class Reinitialisation extends Component {
    state = {
        password: {
            password: null,
            lettre: 0,
            Majuscule: 0,
            chiffre: 0,
        },
        id: 0,
        verifPasswd: null,
        afficherPasswd: true,
        afficherPasswd2: null,
        verifPasswd2: null,
        redirection: false,
        redirectionValide: false
    };

    componentDidMount() {
        const params = window.location.pathname.split('/');
        const data = {
            key: params.slice(2,params.length).join('/')
        }
        axios.post('http://localhost:8000/user/reinit/check', data)
            .then((response) => {
                if (response.data.search === 0){
                    this.props.history.push("/");
                } else {
                    this.setState({id: response.data.id})
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.changeOk !== this.props.changeOk){
            this.props.history.push("/recherche");
        } else if (nextProps.tokenFail !== this.props.tokenFail){
            this.props.history.push("/");
        }
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
        } else {
            this.setState({ afficherPasswd2: true })
        }
    }

    blurHandler(type) {
        if (type === 'passwd') {
            this.setState({ afficherPasswd: false })
        } else {
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
        let passwd2 = null;
        let styleBtn = { opacity: 0.33 };
        let disabled = false;

        if (this.state.verifPasswd && this.state.verifPasswd2) {
            styleBtn = null;
            disabled = true;
        }

        if (this.state.afficherPasswd2) {
            if (!this.state.verifPasswd2) {
                passwd2 =
                    <div className={classes.Modal}>
                        <p style={{ color: '#FF1493' }}>Le mot de passe de correspond pas</p>
                    </div>
            }
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
                <div className={classes.Modal}>
                    <p style={colorLettre}>Il faut au moins 8 lettres</p>
                    <p style={colorMaj}>Il faut au moins 1 Majuscule</p>
                    <p style={colorNbr}>Il faut au moins 5 chiffres</p>
                </div>
            )
        }
        return (
            <Aux>
                {passwd2}
                {passwd}
            <Layout connexion='false'>
                <Background/>
                <form className={classes.Form} onSubmit={(e) => e.preventDefault()}>
                    <label className={classes.Label}>Réinitialisez votre mot de passe <span className={classes.Exclamation}>!</span></label>
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
                        style={styleBtn} onClick={() => this.props.newPassword(this.state.password.password, this.state.id)}>Réinitialisation</button>
                </form>
            </Layout>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        changeOk: state.account.redirection,
        tokenFail: state.account.redirectionToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        newPassword: (passwd, id) => dispatch(account.newPassword(passwd, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reinitialisation);