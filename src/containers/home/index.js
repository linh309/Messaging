//container/home/index.js
import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Home = props => (
    <div>
        <h1>Home</h1>
        <p>Welcome</p>
        <button onClick={()=>props.changePage()}>Go to about page</button>
    </div>
)

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changePage: () => push('/about-us') //how does push act?
}, dispatch);

//The connect() function connects a React component to a Redux store.
export default connect (
    null, //mapStateToProps
    mapDispatchToProps //MapDispatchToProps => use can use dispatch via props of class/function
)(Home);

