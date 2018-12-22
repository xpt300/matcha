import * as actionTypes from './actionTypes'
import axios from 'axios';

export const identifiant = (login, passwd, response) => {
    return {
        type: actionTypes.CONNEXION,
        login: login,
        passwd: passwd,
        response: response
    }
}

export const connexion = (login, passwd) => {
    return dispatch => {
        axios.get('http://localhost:8000/user/account/?mail=' + login + '&key=' + passwd)
        .then((response) => {
            console.log(response)
            if (response.data.length === 0) {
                dispatch({type: actionTypes.CONNEXION_FAILED});
            } else {
                sessionStorage.setItem('jwtToken', response.data.token)
                dispatch(identifiant(login, passwd, response.data.res))
            }
        }).catch(err => console.log(err));
    };
};

export const errorReset = () => {
    return {
        type: actionTypes.ERROR_RESET
    }
}

export const queryCrypt = (data) => {
    return {
        type: actionTypes.ACCOUNT_CONFIRMATION,
        response: data
    }
}

export const accountConfirmation = (data) => {
    return dispatch => {
        axios.post('http://localhost:8000/user/confirmation', data)
        .then((response) => {
            if (response.data.search === 0){
                dispatch({type: actionTypes.QUERY_FALSE})
            } else {
                sessionStorage.setItem('jwtToken', response.data.token)
                dispatch(queryCrypt(response.data.resultat[0]))
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const sendLoginPasswd = (login, passwd) => {
    return {
        type:actionTypes.NEWLOGIN_PASSWD,
        login: login,
        passwd: passwd
    }
}

export const newLoginPasswd = (login, passwd) => {
    return dispatch => {
        axios.get('http://localhost:8000/user/mail/?mail=' + login)
        .then((response) => {
                if (response.data.length === 0) {     
                   dispatch(sendLoginPasswd(login, passwd))
                } else {
                    dispatch({type: actionTypes.MAIL_EXIST});
                }
            }).catch(err => console.log(err));
    }
}

export const newInfo = (nom, prenom, date, genre, target) => {
    return {
        type: actionTypes.NEW_INFO,
        prenom: prenom, 
        nom: nom, 
        anniversaire: date,
        genre: genre,
        target: target
    }
}

export const newAddress = (loc) => {
    return {
        type: actionTypes.NEW_ADDRESS,
        address: loc.address, 
        pays: loc.country,
        ville: loc.ville,
        longitude: loc.longitude,
        latitude: loc.latitude
    }
}

export const passwdChange = (data) => {
    return {
        type: actionTypes.NEW_PASSWD,
        response: data
    }
}

export const newPassword = (passwd, id) => {
    return dispatch => {
        const data = {
            passwd: passwd,
            id: id
        }
        axios.post('http://localhost:8000/user/reinit', data)
            .then((response) => {
                if (response.status === 200){
                    sessionStorage.setItem('jwtToken', response.data.token);
                    dispatch(passwdChange(response.data.res[0]));
                } else {
                    dispatch({type: actionTypes.REDIRECTION})
                }
            })
            .catch((err) => {
                console.log(err);
        })
    }
} 