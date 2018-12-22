import React from 'react';

import NavigationItems from '../Navigations/NavigationItems';
import classes from './Header.css';

const Header = (props) => {

    const Nav = (
            <nav className={classes.Nav}>
                <NavigationItems />
            </nav>
    );

    return (
        <header className={classes.Header}>
            <p className={classes.Title}>Match<span className={classes.Letter}>a</span></p>
            {props.auth === 'false' ? null : Nav}
        </header>
    );
}

export default Header;