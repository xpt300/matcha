import React, {Component} from 'react';

import classes from './Recherche.css';
import Reglage from '../../components/Reglage/Reglage';
import RechercheItems from '../../components/RechercheItems/RechercheItems';
import ButtonSlider from '../../components/UI/ButtonSlider/ButtonSlider';
import axios from 'axios';

class Recherche extends Component {
    state = {
        reglage: {},
        data: {
            user: [[
                'Maxime',
                ''],
                ['Gauthier',
                '']
            ],
        }
    }

    componentDidMount() {
        const token = {
            token: sessionStorage.getItem('jwtToken')
        }
        if (token.token) {
            axios.post('http://localhost:8000/session/check', token)
                .then((response) => {
                    console.log(response.data)
                    if (response.status !== 200) {
                        this.props.history.push('/')
                    } else {
                        axios.post('http://localhost:8000/recherche/reglage', response.data)
                            .then((response) => {
                                this.setState({reglage : response.data[0]})
                            })
                    }
                });
        } else {
            this.props.history.push('/')
        }
    }

    rechercheLike = () => {
        console.log('Prec')
    }

    rechercheNotLike = () => {
        console.log('Suivant')
    }

    onDrop = (e, resu) => {
        console.log(e.dataTransfer.getData('id'));
        console.log('resu : ', resu);
    }

    render() {
        console.log(this.state.reglage, "state")
        return (
            <div className={classes.Recherche}>
                <Reglage/>
                {this.state.data.user.map(item => 
                    <RechercheItems key={item[0]} 
                                    id={item[0]}
                                    onDrop={(e, resu) => this.onDrop(e, resu)}/>
                )}
                <div className={classes.Button}>
                    <ButtonSlider button="notlike" clickMove={this.rechercheLike} onDrop={(e, resu) => this.onDrop(e, resu)}/>
                    <ButtonSlider button="like" clickMove={this.rechercheNotLike} onDrop={(e, resu) => this.onDrop(e, resu)}/>
                </div>
            </div>  
        );
    }
}

export default Recherche;
