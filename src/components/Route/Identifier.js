import React from 'react';

import {Route, Switch} from 'react-router-dom';
import Profil from '../../containers/Profil/Profil';
import Layout from '../Layout/Layout';
import Recherche from '../../containers/Recherche/Recherche';

const identifie = () => {
    return (
        <Layout connexion='true'>
            <Switch>   
                <Route path='/user' component={Profil}/>
                <Route path='/recherche' component={Recherche}/>
            </Switch>
        </Layout>
    );
}

export default identifie;