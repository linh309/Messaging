//container/about/index.js
import React from 'react';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.onBackToHomePage = this.onBackToHomePage.bind(this);
  }

  onBackToHomePage() {
    // this.props.dispatch({
    //   type: "Incrementing"
    // })

    setTimeout(() => {
      this.props.dispatch({
        type: "Incrementing"
      })
    }, 2000)

    this.props.dispatch(push('/'));
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
  push: bindActionCreators(push, dispatch)
})

export default connect (
  null,
  null
)(About);