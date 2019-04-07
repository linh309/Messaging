//container/about/index.js
import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// const About = props => (
//     <div>
//       <h1>About Us</h1>
//       <p>Hello Medium!</p>
//       <button onClick={()=>props.changePage()}>Back to home page</button>
//     </div>
// )


class About extends React.Component {
  constructor(props) {
    super(props);
    this.onBackToHomePage = this.onBackToHomePage.bind(this);
  }

  onBackToHomePage() {
    debugger;
    // this.props.push.dispatch({
    //   type: "Incrementing"
    // });
    this.props.push('/');
  }

  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>Hello Medium!</p>
        <button onClick={this.onBackToHomePage}>Back to home page</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  //actions: bindActionCreators(authActionCreators, dispatch),
  push: bindActionCreators(push, dispatch)
})

export default connect (
  null,
  mapDispatchToProps
)(About);