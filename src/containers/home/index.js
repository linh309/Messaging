//container/home/index.js
import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {increment} from '../../actioncreators/counterActionCreators'

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Welcome</p>
        <p><b>Count: </b>{props.count}</p>
        <button onClick={props.increment}>Increment</button>
        <button onClick={()=>props.changePage()}>Go to about page</button>
    </div>
);

const mapStateToProps = ({ counter }) => ({
    count: counter.count
})

//An action creator is, quite simply, a function that creates an action.
//Do not confuse the two terms—again, an action is a payload of information, and an action creator is a factory that creates an action.
//bindActionCreators: Turns an object whose values are action creators,
//into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
const mapDispatchToProps = (dispatch) => bindActionCreators({
    increment: increment,
    changePage: () => push('/about-us') //how does push act?
}, dispatch);



//The connect() function connects a React component to a Redux store.
export default connect (
    mapStateToProps, //mapStateToProps
    mapDispatchToProps //MapDispatchToProps => use can use dispatch via props of class/function
)(Home);

