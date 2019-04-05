//Tutorial: Simple React Redux App by @nunosoaresdev https://medium.com/p/tutorial-simple-react-redux-app-cd559621ec00
import React from 'react';
import ReactDOM from 'react-dom';
import {todoRef} from './config/firebase'; // '../config/firebase'

// export const addToDo = newToDo => async dispatch => {
//     todosRef.push().set(newToDo);
// };

// export const fetchToDos = () => async dispatch => {
//     todosRef.on("value", snapshot => {
//         dispatch({
//         type: FETCH_TODOS,
//         payload: snapshot.val()
//         });
//     });
// };

class App extends React.Component {
    constructor(props) {
        super(props);
        const todos = [];
        this.onSubmitTodo = this.onSubmitTodo.bind(this);
        this.handleChangeTodo = this.handleChangeTodo.bind(this);
        this.componentWillMount  = this.componentWillMount .bind(this);
        this.state = {
            todo: '',
            todos: todos
        };
    }

    componentWillMount() {
        todoRef.on("value", snapshop => {
            const todos = [];
            snapshop.forEach((item)=>{
                todos.push({
                    todoValue: item.val(),
                    key: item.key
                });
            })   
            this.setState({
                todos: todos
            })         
        })
    }

    onSubmitTodo(e) {
        //var item = childSnapshot.val();
        //item.key = childSnapshot.key;
        e.preventDefault();
        todoRef.push().set(this.state.todo);
        todoRef.on("value", snapshot => {
            const messageList = [];
            snapshot.forEach(function(childSnapshot) {
                const newTodo = {};
                newTodo.todoValue = childSnapshot.val();
                newTodo.key = childSnapshot.key;
        
                messageList.push(newTodo);
            });
           
            this.setState({
                todos: messageList
            })
        })
       
    }

    handleChangeTodo(e) {
        this.setState({
            todo: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitTodo}>
                    <input type="text" onChange = {this.handleChangeTodo} value={this.state.todo}/>
                    <input type="submit" value="Add Todo" />
                   
                    <ul>
                        {this.state.todos.map((todo)=><li>{todo.todoValue}</li>)}
                    </ul>
                </form>
            </div>
        );                
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
