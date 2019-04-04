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

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                        onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '', scale: 'c'};
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temperature) {
        this.setState({scale:'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }  

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        
        return (
            <div>
                <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput sacle='f'temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
            </div>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));