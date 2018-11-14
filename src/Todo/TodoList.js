import React, {Component} from 'react';

import * as firebase from 'firebase'
import config from "./config";


class TodoList extends Component {

    constructor() {
        super();
        firebase.initializeApp(config);
        this.state = {
            userInput: '',
            items: []
        }

        const ref = firebase.database().ref('item'); // référence la base de donnée

        ref.on('value', snapshot => { // snapshot est une photo instantanée de la fonction de BDD
            this.setState({
                    item: snapshot.val(),
                    loading: false //Une fois que tout est chargé
                }
            )
        })
    }

    componentDidMount() {
        this.setState({
            userInput: 18
        })
    }

    onChange(event) {
        this.setState({
            userInput: event.target.value
        }, () => console.log(this.state.userInput))
    }

    addTodo(event) {
        const ref = firebase.database().ref().child('todolist-71448');
        const refValue = ref.child('tache');

        refValue.on('value', snap => { // .on = synchronyse in real time
            this.setState({
                userInput: snap.val()
            }, () => console.log(this.state))
        });


        event.preventDefault(); //Pour éviter que la page se reload
    }

    renderTodos() {
        return this.state.items.map((item) => {
            return (
                <div className="list-group-item" key={item}>
                    {item} | <button onClick={this.deleteTodo.bind(this)}>X</button>
                </div>
            )
        });
    }

    deleteTodo(event) {
        event.preventDefault();
        const array = this.state.items;
        const index = array.indexOf(event.target.value);
        array.splice(index, 1); //supprimer la todo du tableau
        this.setState({
            items: array
        });
    }


    render() {
                return (
                <div>
                <h1 align="center">Ma Todo list</h1>
                <form className="form-row align-items-center">
                    <input
                        value={this.state.userInput}
                        type="text"
                        placeholder="Renseigner un item"
                        onChange={this.onChange.bind(this)}
                        className="form-control mb-2"
                    />
                    <button
                        onClick={this.addTodo.bind(this.state.userInput)}
                        className="btn btn-primary"
                        type="button">
                        Ajouter
                    </button>
                </form>
                <div className="list-group">
                    {this.renderTodos()}
                    {this.state.userInput}
                </div>
            </div>
        );

    }
}

export default TodoList;