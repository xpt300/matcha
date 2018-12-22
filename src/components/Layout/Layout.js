import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import classes from './Layout.css';

class Layout extends Component {
    render () {
        return (
            <Aux>
                <Header auth={this.props.connexion}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                <Footer />
            </Aux>
        );
    }
}

export default Layout;