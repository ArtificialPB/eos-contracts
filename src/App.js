import React, { Component } from 'react';
import EOSUI from './components/eosnetwork.js';
import Trigger from './components/trigger.js'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">EOS LOCKER</h1>
        </header>
        <EOSUI />
        <Trigger />
      </div>
    );
  }
}

export default App;
