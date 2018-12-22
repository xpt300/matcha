import React, {Component} from 'react';

import classes from './Reglage.css';
import Range from '../UI/Range/Range';
import RangeAge from '../UI/Range/RangeAge/RangeAge';
import AllReglage from './AllReglage/AllReglage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aux from '../../hoc/Aux/Aux'; 
import { CSSTransition, transit } from "react-css-transition"; 

class Reglage extends Component {
    state = {
        click: false,
        width: window.innerWidth
    }

    handleResize = () => this.setState({
        width: window.innerWidth
    });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }
    
    clickReglage = () => {
        if (this.state.click) {
            this.setState({click: false})
        } else {
            this.setState({click: true})
        }
    }

    render () {
        let fontawe = null;
        CSSTransition.childContextTypes = {
            // this can be empty
        }
        if (this.state.width > 800 && !this.state.click) {
            fontawe = <FontAwesomeIcon icon="angle-down" onClick={this.clickReglage} className={classes.Icon} size="2x"/>
        }

        return (
            <Aux>
                <div className={classes.Reglage}>
                    <Range />
                    <RangeAge />
                    <div className={classes.Font}>
                        {fontawe}
                    </div>
                </div>
                {this.state.width < 800 ? null :
                <CSSTransition
                    className={classes.Trans}
                    defaultStyle={{ transform: "translate(0, -300px)" }}
                    enterStyle={{ transform: transit("translate(0, 0)", 500, "ease-in-out") }}
                    leaveStyle={{ transform: transit("translate(0, -300px)", 500, "ease-in-out") }}
                    activeStyle={{ transform: "translate(0, 0)" }}
                    active={this.state.click}
                >
                    <AllReglage clickOn={this.clickReglage} {...this.state}/>
                </CSSTransition>}
            </Aux>
        )
    }
}

export default Reglage;