import React, {Component} from 'react';

import {NavLink} from 'react-router-dom';
import classes from './NavigationItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavigationItem extends Component {   
    render () {
        return (
           <li className={classes.Nav}>
               <NavLink
                   to={this.props.link}>
                   {this.props.children} <FontAwesomeIcon icon={this.props.icon} className={classes.Icon} />
               </NavLink>
           </li>
       );
    }
}

export default NavigationItem;