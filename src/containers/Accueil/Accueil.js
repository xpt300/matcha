import React, { Component } from 'react';

import Layout from '../../components/Layout/Layout';
import Aux from '../../hoc/Aux/Aux';
import LoginPassword from '../../components/Form/LoginPassword/LoginPasseword';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Genre from '../../components/Form/Genre/Genre';
import axios from 'axios';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import classes from './Accueil.css';
import Location from '../../components/Form/Location/Location';
import LogIn from '../../components/Form/LogIn/LogIn';
import { connect } from 'react-redux';
import * as account from '../../store/actions/index';
import Background from '../../components/Background-image/Background-image';


class Accueil extends Component {
    _isMounted = false;

    state = {
        showLogPassword: true,
        facebook: false,
        showGenre: false,
        showAdresse: false,
        showLogIn: false,
        mailexist: false,
        mailintrouvable: false,
        passwd: false,
        mdp : false,
        redirection: false,
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this._isMounted = true;
        if (nextProps.errorPasswd !== this.props.errorPasswd && nextProps.errorPasswd === true) {
          this.setState({ passwd: true })
        } else if (nextProps.errorMail !== this.props.errorMail && nextProps.errorMail === true) {
            this.setState({ mailexist: true })
        } else if (nextProps.formLoginPasswd !== this.props.formLoginPasswd && nextProps.formLoginPasswd === true) {
            this.setState({ showLogPassword: false, showGenre: true });
        } else if (nextProps.formInfo !== this.props.formInfo && nextProps.formInfo === true) {
            this.setState({ showGenre: false, showAdresse: true });
        } else if (nextProps.recherche !== this.props.recherche && nextProps.recherche === true) {
            this.props.history.push("/recherche");
        } 
        else if (nextProps.redirection !== this.props.redirection && nextProps.redirection === true) {
            axios.post('http://localhost:8000/user/inscription/new', nextProps.account)
                .then((response) => {
                    if (this._isMounted) {
                        if (response.status === 200) {
                            sessionStorage.setItem('jwtToken', response.data.token);
                            this.props.history.push("/recherche");
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
      }    


    showFacebook = (data) => {
        axios.get('http://localhost:8000/user/mail/?mail=' + data.email)
        .then((response) => {
            if (response.status !== 200) {     
                this.setState({ facebook: true });
            } else if (response.data[0]){
                this.setState({ mailexist: true });
            } else {
                axios.post('http://localhost:8000/user/inscription/new/facebook', data)
                .then((response) => {
                    if (response.status === 200){
                        sessionStorage.setItem('jwtToken', response.data.token);
                        this.props.history.push("/recherche");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        }).catch(err => console.log(err));
    }

    showLogIn = () => {
        this.setState({showLogPassword: false, showLogIn: true});
    }

    okHandler = () => {
        this.setState({ mailexist: false, passwd: false, facebook: false, mailintrouvable: false });
        this.props.errorReset();
    }

    showRetour = () => {
        if (this.state.showAdresse) {
            this.setState({showAdresse: false, showGenre: true})
        } else if (this.state.showGenre) {
            this.setState({showLogPassword: true, showGenre: false})
        } else if (this.state.showLogIn){
            this.setState({showLogIn: false, showLogPassword: true})
        } else {
            this.setState({showMdpPerdu: false, showLogIn:true})
        }
    }

    sendMail = (login) => {
        axios.get('http://localhost:8000/user/mail/?mail=' + login)
        .then((response) => {
                if (response.data[0]) {
                    let data = {
                        mail: login,
                        id: response.data[0]
                    }
                    axios.post('http://localhost:8000/user/mailsend', data)
                    .then((response) => {
                        if (response.status === 200) {     
                            this.setState({mdp: true, showLogIn: false})
                        } 
                    }).catch(err => console.log(err));
                } else {
                    this.setState({ mailintrouvable: true });
                }
        }).catch(err => console.log(err));
    }

    render() {
        let mailexist =
            <Aux >
                <Backdrop show={this.state.mailexist} click={this.okHandler} />
                <Modal type="err">Mail existant</Modal>
            </Aux>

        let mailintrouvable =
            <Aux >
                <Backdrop show={this.state.mailintrouvable} click={this.okHandler} />
                <Modal type="err">Le mail est introuvable</Modal>
            </Aux>

        let passwd =
            <Aux >
                <Backdrop show={this.state.passwd} click={this.okHandler} />
                <Modal type="err">Mauvais mot de passe / mail / compte non validé</Modal>
            </Aux>

        let facebook =
            <Aux >
                <Backdrop show={this.state.facebook} click={this.okHandler} />
                <Modal type="err">La connexion avec Facebook n'a pas marchée</Modal>
            </Aux>

        let mailsend = 
            <Aux>
                <Modal type="success">Un mail de réinitialisation vous a été envoyé</Modal>
            </Aux>

        if (!this.state.mailexist) {
            mailexist = null;
        }
        if (!this.state.passwd) {
            passwd = null;
        }
        if (!this.state.facebook){
            facebook = null;
        }
        if (!this.state.mdp){
            mailsend = null;
        }
        if (!this.state.mailintrouvable){
            mailintrouvable = null;
        }
        return (
            <Layout connexion='false'>
                <Background/>
                <ProgressBar step2={this.state.showAdresse ? true: this.state.showGenre} step3={this.state.showAdresse} />
                {mailexist}
                {passwd}     
                {facebook}    
                {mailsend}
                {mailintrouvable}
                <ReactCSSTransitionGroup
                className={classes.Transition}
                    transitionName = { {
                        enter: classes['accueil-enter'],
                        enterActive: classes['accueil-enter-active'],
                        leave: classes['accueil-leave'],
                        leaveActive: classes['accueil-leave-active']
                    } }
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}> 
                        {this.state.showLogIn ? <LogIn 
                                next={(passwd, login) => this.props.connexion(passwd, login)} 
                                retour={this.showRetour}
                                mdp={(login) => this.sendMail(login)}/> : null}
                        {this.state.showLogPassword ? <LoginPassword 
                                next={(passwd, login) => this.props.newLoginPasswd(login, passwd)} 
                                log={this.showLogIn}
                                {...this.props.account}
                                responseFacebook={(response) => this.showFacebook(response)}/> : null}
                        {this.state.showGenre ? <Genre 
                            next={(nom, prenom, date, genre, target) => this.props.newInfo(nom, prenom, date, genre, target)} 
                            retour={this.showRetour}
                            {...this.props.account}/> : null}
                        {this.state.showAdresse ? <Location 
                            next={(location) => this.props.newAddress(location)}
                            retour={this.showRetour}
                            {...this.props.account}/> : null}
                </ReactCSSTransitionGroup>
            </Layout>
        );
    };

}

const mapStateToProps = state => {
    return {
        errorPasswd: state.account.passwd,
        recherche: state.account.recherche,
        redirection: state.account.redirection,
        errorMail: state.account.mailexist,
        formLoginPasswd: state.account.showLogPassword,
        formInfo: state.account.showGenre,
        account: state.account.account
    };
}

const mapDispatchToProps = dispatch => {
    return {
        connexion: (passwd, login) => dispatch(account.connexion(login, passwd)),
        errorReset: () => dispatch(account.errorReset()),
        newLoginPasswd: (login, passwd) => dispatch(account.newLoginPasswd(login, passwd)),
        newInfo: (nom, prenom, date, genre, target) => dispatch(account.newInfo(nom, prenom, date, genre, target)),
        newAddress: (location) => dispatch(account.newAddress(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);