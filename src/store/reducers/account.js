import * as actionTypes from '../actions/actionTypes';

const initialState = {
    state: {
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
        recherche: false,
        queryKey: false,
        account: {
            mail: '',
            mot_de_passe: '',
            prenom: '',
            nom: '',
            anniversaire: '',
            address: '',
            codePostal: '',
            pays: '',
            ville: '',
            compte_valide: 'N',
            notification: 'Y',
            genre: '',
            target: '',
            longitude: null,
            latitude: null
        },
        redirectionToken: false
    }
}

const account = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CONNEXION:
            return {
                ...state,
                showLogIn: false,
                recherche: true,
                account: {
                    ...state.account,
                    mail: action.response.mail,
                    address: action.response.address,
                    anniversaire: action.response.anniversaire,
                    compte_valide: action.response.compte_valide,
                    nom: action.response.nom,
                    notification: action.response.notification,
                    pays: action.response.pays,
                    prenom: action.response.prenom,
                    ville: action.response.ville,
                }
            }
        case actionTypes.CONNEXION_FAILED:
            return {
                ...state,
                passwd: true
            }
        case actionTypes.ERROR_RESET:
            return {
                ...state,
                passwd: false,
                mailexist: false, 
                facebook: false, 
                mailintrouvable: false
            }
        case actionTypes.ACCOUNT_CONFIRMATION:
            return {
                ...state,
                account: {
                    ...state.account,
                    mail: action.response.mail,
                    address: action.response.address,
                    anniversaire: action.response.anniversaire,
                    compte_valide: action.response.compte_valide,
                    nom: action.response.nom,
                    notification: action.response.notification,
                    pays: action.response.pays,
                    prenom: action.response.prenom,
                    ville: action.response.ville
                }
            }
        case actionTypes.QUERY_FALSE:
            return {
                ...state,
                queryKey: true
            }
        case actionTypes.MAIL_EXIST:
            return {
                ...state,
                mailexist: true
            }
        case actionTypes.NEWLOGIN_PASSWD:
            return {
                ...state,
                showLogPassword: true,
                account: {
                    ...state.account,
                    mail: action.login,
                    mot_de_passe: action.passwd
                }
            }
        case actionTypes.NEW_INFO:
            return {
                ...state,
                showGenre: true, 
                account: {
                    ...state.account,
                    prenom: action.nom, 
                    nom: action.prenom, 
                    anniversaire: action.anniversaire,
                    genre: action.genre,
                    target: action.target
                }
            }
        case actionTypes.NEW_ADDRESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    address: action.address, 
                    pays: action.country,
                    ville: action.ville,
                    compte_valide: 'N',
                    notification: 'Y',
                    longitude: action.longitude,
                    latitude: action.latitude
                },
                redirection: true
            }
        case actionTypes.NEW_PASSWD:
            return {
                ...state,
                account: {
                    ...state.account,
                    address: action.response.address,
                    anniversaire: action.response.anniversaire,
                    compte_valide: action.response.compte_valide,
                    mail: action.response.mail,
                    nom: action.response.nom,
                    notification: action.response.notification,
                    pays: action.response.pays,
                    prenom: action.response.prenom,
                    ville: action.response.ville
                },
                redirection: true
            }
        case actionTypes.REDIRECTION:
            return {
                ...state,
                redirectionToken: true
            }  
        default:
            return state;
    }
}

export default account;