import React, { Component } from 'react';
import Login from './pages/Login'
import Logged from './pages/Logged'

class App extends Component {

  state = {
    logged: localStorage.getItem('authenticated'),
  }

  setStateHandler = (value) => {
    this.setState(value)
  }

  render() {
    if (this.state.logged) {
      return (
        <Logged setStateHandler={this.setStateHandler} />
      )
    }
    return (
      <Login setStateHandler={this.setStateHandler} />
    )
  }

}

export default App;
