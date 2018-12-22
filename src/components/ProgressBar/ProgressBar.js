import React from 'react';

import classes from './ProgressBar.css'

const progressBar = (props) => {
    const step1 = classes.Active;
    const step2 = props.step2 ? classes.Active : null
    const step3 = props.step3 ? classes.Active : null;
    return (
        <div className={classes.Container}>
            <ul className={classes.ProgressBar}>
                <li className={step1}>Mot de passe / Login</li>
                <li className={step2}>Parlez nous de vous</li>
                <li className={step3}>Votre adresse</li>
            </ul>
        </div>
    );
}

export default progressBar;