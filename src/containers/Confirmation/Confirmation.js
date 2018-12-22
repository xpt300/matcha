import React, { Component } from 'react';

import classes from './Confirmation.css';
import * as account from '../../store/actions/index'
import { connect } from 'react-redux';
import Background from '../../components/Background-image/Background-image';
import Layout from '../../components/Layout/Layout';

class Reinitialisation extends Component {
    componentDidMount() {
        const params = window.location.pathname.split('/');
        const data = {
                key: params.slice(2,params.length).join('/')
        }
        this.props.accountConfirmation(data);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.queryFalse !== this.props.queryFalse) {
            this.props.history.push("/");
        }
    }  

    Redirection() {
        this.props.history.push("/recherche");
    }

    render() {
        return (
            <Layout connexion='false'>
                <Background/>
                <form className={classes.Form} onSubmit={(e) => e.preventDefault()}>
                    <label className={classes.Label}>Votre compte est bien validé <span role="img" aria-label="Pouce">👍</span> <span className={classes.Exclamation}>!</span></label>
                    <button className={classes.Btn}
                        type="button"
                        value="submit"
                        disabled={false}
                        onClick={() => this.Redirection()}>Allez chercher l'amour maintenant</button>
                </form>
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        queryFalse: state.account.queryKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        accountConfirmation: (data) => dispatch(account.accountConfirmation(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reinitialisation);