import React, {Component} from 'react';
import './App.css';
import TodoList from './Todo/TodoList'
//import List from './Todo/List'


class App extends Component {


    render() {

        return (
            <div>
                <TodoList/>
                {/*<List/>*/}
            </div>
        );

    }
}

export default App;
