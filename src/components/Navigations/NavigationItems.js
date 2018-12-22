import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import Notification from '../UI/Notification/Notification';
import Aux from '../../hoc/Aux/Aux';

const NavigationItems = () => {
    return (
        <Aux>
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/user" icon='user'>
                    Mon Compte
                </NavigationItem>
                <NavigationItem link="/" icon='power-off'>
                    Déconnexion 
                </NavigationItem>
            </ul>
            <Notification>
                +99
            </Notification>
        </Aux>
    );
};

export default NavigationItems;