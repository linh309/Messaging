//Tutorial: Simple React Redux App by @nunosoaresdev https://medium.com/p/tutorial-simple-react-redux-app-cd559621ec00
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { connect } from "react-redux";
import './comment.css';

const actionName = {
    ADD_POST: 'ADD_POST',
    DELETE_POST: 'DELETE_POST',
    EDIT_POST: 'EDIT_POST',
    UPDATE_POST: 'UPDATE_POST'
}


/********************************************************************* <PostForm /> Component ********************************************************************* */
class PostFormComponent extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.getTitle.value;
        const message = this.getMessage.value;
        const data = {
            id: new Date(),
            title,
            message,
            editing: false
        };

        //dispatch an action and it will be passed to reducer as an input
        this.props.dispatch({
            type: actionName.ADD_POST,
            data
        });

        //After submit form should clear value
        this.getTitle.value = '';
        this.getMessage.value = '';
    }

    render() {
        return (
            <div className="post-container">
                <h1 className="post_heading">Create Post</h1>
                <form className="form" onSubmit={this.handleSubmit}>
                    <input required type="text" placeholder="Enter Post Title" ref={(input)=>this.getTitle = input}/><br /><br />
                    <textarea required rows="5" cols="28" placeholder="Enter Post" ref={(input)=>this.getMessage = input} /><br /><br />
                    <button>Post</button>
                </form>
            </div>
        );
    }
}

//call connect() method from Redux to pass dispatch() from Redux store as props of component
//because connect() will create new component so can't use original component to use dispatch() as props
const PostForm = connect()(PostFormComponent);

/********************************************************************* <PostForm /> Component ********************************************************************* */




/********************************************************************* <Post /> Component ********************************************************************* */

class PostComponent extends React.Component {
    constructor(props){
        super(props);
        this.onDeletePost = this.onDeletePost.bind(this);
        this.onEditPost = this.onEditPost.bind(this);
    }

    onDeletePost(e) {
        this.props.dispatch({
            type: actionName.DELETE_POST,
            id: this.props.post.id
        });
    }

    onEditPost(e) {
        this.props.dispatch({
            type: actionName.EDIT_POST,
            id: this.props.post.id
        });
    }

    render() {
        return (
            <div className="post">
                <h2 className="post_title">{this.props.post.title}</h2>
                <p className="post_message">{this.props.post.message}</p>
                <div className="control-buttons">
                    <button className="edit" onClick={this.onEditPost}>Edit</button>
                    <button className="delete" onClick={this.onDeletePost}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

const Post = connect()(PostComponent);

/********************************************************************* <Post /> Component ********************************************************************* */


/********************************************************************* <EditPost /> Component ********************************************************************* */
class EditPostComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdatePost = this.onUpdatePost.bind(this);
    }

    onUpdatePost(e) {
        e.preventDefault();
        const action = {
            type: actionName.UPDATE_POST,
            id: this.props.post.id,
            data: {
                newTitle: this.getTitle.value,
                newMessage: this.getMessage.value                
            }
        }

        this.props.dispatch(action);
    }

    render() {
        return (
            <div className="post">
                <form className="form" onSubmit={this.onUpdatePost}>
                    <input required type="text" ref={(input) => this.getTitle = input} 
                        defaultValue={this.props.post.title} placeholder="Enter Post Title" /><br /><br />
                    <textarea required rows="5" ref={(input) => this.getMessage = input} 
                        defaultValue={this.props.post.message} cols="28" placeholder="Enter Post" /><br /><br />
                    <button>Update</button>
                </form>
            </div>
        );
    }
}

const EditPost = connect()(EditPostComponent);

/********************************************************************* <EditPost /> Component ********************************************************************* */



/********************************************************************* <AllPost /> Component ********************************************************************* */
class AllPostComponent extends React.Component {
    render() {
        return (
            <div>
                <h1 className="post_heading">All Posts</h1>
                {this.props.posts.map((post) => (
                    <div key={post.id}>                        
                        {post.editing
                            ? <EditPost key={post.id} post={post} />
                            : <Post     key={post.id} post={post} />}
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
}

const AllPost = connect(mapStateToProps)(AllPostComponent);

/********************************************************************* <AllPost /> Component ********************************************************************* */


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="navbar">
                    <h2 class="center">Post It</h2>                    
                </div>
                <PostForm />
                <AllPost />
            </div>
        );
    }
}

//define reducer. Why always define default value for current state??
const postReducer = (state = [], action) => {
    switch (action.type) {
        case actionName.ADD_POST:
            console.log(`pass action to reducer at. Data: ${action}`);
            return state.concat([action.data])

        case actionName.DELETE_POST:
            return state.filter((post)=>post.id != action.id)
        
        case actionName.EDIT_POST:
            return state.map((post) => post.id===action.id ? {...post,editing:!post.editing}:post)

        case actionName.UPDATE_POST:
            //close edit form
            //update the current element => Set edit = false
            return state.map((post)=>{
                if(post.id === action.id) {
                  return {
                     ...post,
                     title:action.data.newTitle,
                     message:action.data.newMessage,
                     editing: !post.editing
                  }
                } else return post;
              })

        default: 
            return state;
    }
}

//define store (Single source of truth principle) for whole application, the special argument must be passed to this method is "reducers"
const store = createStore(postReducer);

//<App /> is wrapped by <Provider> element and we don't need to define a "Provider" class
ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>,
    document.getElementById("root"));




// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<h1>Hello world</h1>, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// var user = {


//     name: "Linh",
//     avatar: "https://via.placeholder.com/50x50.png?text=Test",
// };
// var date = new Date();
// var now = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
// const name = "linh";
// const h1Tag = <h1>Hello {name}!. Now is {now}</h1>;
// var childAndParent = (
//     <div>
//         <h1>
//             <img src={user.avatar} />
//             Good Morning
//             <b>{user.name}</b>            
//         </h1>        
//     </div>
// );


// ReactDOM.render(childAndParent, document.getElementById('root'));

//demo how to display time in real time by calling ReactDom.render every 1 second
// function tick(){        
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>Now is {new Date().toLocaleTimeString()}</h2>
//         </div>        
//     );
//     ReactDOM.render(element, document.getElementById('root'))
// }

// setInterval(tick,1000);



// class Welcome extends React.Component {
    //use in normal case
    // //define constructor to get props that passed from ReactDOM.render method
    // constructor(props) {
    //     super(props);
    // }
    
    // render() {
    //     //why need to use this to use "props" => can't use props without "this"
    //     return <h1>Hello, {this.props.user.name} again!</h1>
    // }
// }



//define react component as class ES6 syntax
// var user = {
//     name: "Linh",
//     avatar: "https://via.placeholder.com/50x50.png?text=Test",
// };

// class Welcome extends React.Component {
//     //define constructor to get props that passed from ReactDOM.render method
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 <User username={this.props.user.name}/>
//             </div>        
//         )
//     }
// }

// class User extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         //why need to use this to use "props" => can't use props without "this"
//         return <h1>Hello, {this.props.username} again!</h1>
//     }
// }

// function formatDate(date) {
//     return date.toLocaleDateString();
//   }

// //when create components => need to understand when to class and when to use function
// function Avatar(props) {
//     return (
//         <img className="Avatar" 
//             src={props.user.avatarUrl}
//             alt={props.user.name}
//         />
//     );
// }

// function UserInfo(props) {
//     return (
//         <div className="UserInfo">
//             <Avatar user={props.user} />
//             <div className="UserInfo-name">
//                 {props.user.name}
//             </div>
//         </div>
//     );
// }

// class Comment extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="Comment">
//                 <UserInfo user = {this.props.user} />
//                 <div className = "Comment-text">
//                     {this.props.text}
//                 </div>
//                 <div className="Comment-data">
//                     {formatDate(this.props.date)}
//                 </div>
//             </div>
//         );
//     }
// }

// const comment = {
//     text: "Good morning",
//     date: new Date(),
//     user: {
//         avatarUrl: "https://via.placeholder.com/50x50.png?text=Test",
//         name: "Linh"
//     }
// }

// //use "user" as DOM attribute but it's treated props in component
// ReactDOM.render(<Comment 
//                     user = {comment.user} 
//                     text = {comment.text}
//                     date = {comment.date}
//                 />, document.getElementById("root"));

// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {date: new Date()};
//     }

//     componentDidMount() {
//         this.timerID = setInterval(
//             () => this.tick(),
//             1000);
//     }

//     componentWillUnmount(){
//         clearInterval(this.timerID);
//     }

//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Hello</h1>
//                 <h2>Now is: {this.state.date.toLocaleTimeString()}</h2>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<Clock />, document.getElementById("root"));


// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number)=>
//         <li key={number.toString()}>{number}</li>
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }

// const numbers = [1,2,3];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

//Render number
// function ListItem(props) {
//     const value = props.value;
//     return (
//         <li>
//             {value}
//         </li>
//     );
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number)=>
//         <ListItem value={number} key={number.toString()} />
//     );

//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//   <NumberList numbers={numbers} />,
//   document.getElementById('root')
// );


// class NameForm extends React.Component {
//     constructor (props) {
//         super(props);
//         this.state = {value: '', name: '',fruit: "",fruitSelectd: 'lime'};
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {        
//         const target = e.target;
//         const value = e.target.value;
//         var type = e.target.name === "yourname" ? "text" : e.target.name === "yourfruit" ? "select" : "";
//         if (type === "text") {
//             this.setState({
//                 value: value,
//                 name: ''
//             });
//         }
//         else if (type=== "select") {
//             this.setState({ 
//                 fruitSelectd: e.target.value
//             });
//         }
//     }

//     handleSubmit(e) {
//         this.setState({
//             name: this.state.value,
//             fruit: this.state.fruitSelectd
//         });
//         e.preventDefault();
//     }

//     render() {
//         const listFruit = <select name="yourfruit" value={this.state.fruitSelectd} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//         </select>
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <label>
//                     Name: <input type='text' name="yourname" value={this.state.value} onChange={this.handleChange} />
//                 </label>
//                 {listFruit}
//                 <input type="submit" value="Alert Name" />                                
                
//                 <p>Welcome: {this.state.name}</p>
//                 <p>Your drink is: {this.state.fruit}</p>
//             </form>
//         );
//     }
// }

// ReactDOM.render(
//   <NameForm />,
//   document.getElementById('root')
// );

// function toCelsius(fahrenheit) {
//     return (fahrenheit - 32) * 5 / 9;
// }
  
// function toFahrenheit(celsius) {
//     return (celsius * 9 / 5) + 32;
// }

// function tryConvert(temperature, convert) {
//     const input = parseFloat(temperature);
//     if (Number.isNaN(input)) {
//       return '';
//     }
//     const output = convert(input);
//     const rounded = Math.round(output * 1000) / 1000;
//     return rounded.toString();
// }

// const scaleNames = {
//     c: 'Celsius',
//     f: 'Fahrenheit'
//   };

// class TemperatureInput extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleChange = this.handleChange.bind(this);
//     }

//     handleChange(e) {
//         this.props.onTemperatureChange(e.target.value);
//     }

//     render() {
//         const temperature = this.props.temperature;
//         const scale = this.props.scale;
//         return (
//             <fieldset>
//                 <legend>Enter temperature in {scaleNames[scale]}:</legend>
//                 <input  value = {temperature}
//                         onChange = {this.handleChange} />
//             </fieldset>
//         );
//     }
// }

// class Calculator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {temperature: '', scale: 'c'};
//         this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
//         this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
//     }

//     handleCelsiusChange(temperature) {
//         this.setState({scale:'c', temperature});
//     }

//     handleFahrenheitChange(temperature) {
//         this.setState({scale: 'f', temperature});
//     }  

//     render() {
//         const scale = this.state.scale;
//         const temperature = this.state.temperature;
//         const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
//         const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        
//         return (
//             <div>
//                 <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
//                 <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
//             </div>
//         );
//     }
// }

// ReactDOM.render(<Calculator />, document.getElementById("root"));



