import React, { Component } from 'react';

import Accueil from './containers/Accueil/Accueil';
import {Route, Switch, Redirect} from 'react-router-dom';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Identifier from './components/Route/Identifier';
import Reinitialisation from './containers/Reinitialisation/Reinitialisation';
import Confirmation from './containers/Confirmation/Confirmation';


library.add(fas)

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Accueil}/>
          <Route path='/reinitialisation' component={Reinitialisation}/>
          <Route path='/confirmation' component={Confirmation}/>
          <Route path='/(user|recherche)' component={Identifier}/>
          <Redirect to='/'/>
        </Switch>
    );
  }
}

export default App;
