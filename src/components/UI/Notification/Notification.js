import React, {Component} from 'react';

import classes from './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aux from '../../../hoc/Aux/Aux';
import ViewNotif from '../Notification/viewNotif/viewNotif';

class Notification extends Component {
    state = {
        notif: false
    }
    viewNotification = () => {
        if (this.state.notif == false){
            this.setState({notif: true});
        } else {
            this.setState({notif: false});
        }
    }
    render () {
        return (
        <Aux>
            <div className={classes.Notification} onClick={this.viewNotification} >
                <FontAwesomeIcon icon="bell" className={classes.Icon} size="lg"/>
                {this.props.children > 0 ?  <span className={classes.Number}>{this.props.children}</span>
                                        : null }
                {this.state.notif ? <div className={classes.Triangle}></div> : null}
            </div>
            {this.state.notif ? <ViewNotif/> : null}
        </Aux>
        );
    }
}

export default Notification;