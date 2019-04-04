import React from 'react';
import ReactDOM from 'react-dom';

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


//define react component as class ES6 syntax
var user = {
    name: "Linh",
    avatar: "https://via.placeholder.com/50x50.png?text=Test",
};

class Welcome extends React.Component {
    //use in normal case
    // //define constructor to get props that passed from ReactDOM.render method
    // constructor(props) {
    //     super(props);
    // }
    
    // render() {
    //     //why need to use this to use "props" => can't use props without "this"
    //     return <h1>Hello, {this.props.user.name} again!</h1>
    // }

    //define constructor to get props that passed from ReactDOM.render method
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <User username={this.props.user.name}/>
            </div>        
        )
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //why need to use this to use "props" => can't use props without "this"
        return <h1>Hello, {this.props.username} again!</h1>
    }
}


//use "user" as DOM attribute but it's treated props in component
ReactDOM.render(<Welcome user={user} />, document.getElementById("root"));