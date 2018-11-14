import React, {Component} from 'react';

import * as firebase from 'firebase'
import config from './config'


class List extends Component {

    constructor() {
        super();
        firebase.initializeApp(config);
        this.state = {
            loading: true //Permet d'attendre que ça soit chargé avant de faire autre chose
        }
    }

    render() {
        if (this.state.loading) {
            return <h1>Chargement...</h1>
        }

        const values = this.state.item.map((item, i) => <h2 key={i}>{item.valeur}</h2>)

        return (
            <div>
                {values}
            </div>
        );
    }

    componentWillMount() { //ce qu'il se passe juste après que le composant soit chargé
        const ref = firebase.database().ref('item'); // référence la base de donnée

        ref.on('value', snapshot => { // snapshot est une photo instantanée de la fonction de BDD
            this.setState({
                    item: snapshot.val(),
                    loading: false //Une fois que tout est chargé
                }
            )
        })
    }
}

export default List;