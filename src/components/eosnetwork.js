import React, { Component } from 'react';
import EOSJS from 'eosjs';

const config = {
    keyProvider: ['eosio'],
    httpEndpoint: 'http://0.0.0.0:8888',
    expireInSeconds: 10,
    broadcast: true,
    debug: false,
    sign: true
};

class EOSUI extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      head_block_num: props.initialBlock,
      action_result: {},
      eos: EOSJS.Localnet(config),
      time: new Date().toLocaleString(),
        size: -1,

    };
  }

  componentDidMount() {
      this.intervalID = setInterval (
      () => this.tick(),
      500
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
      this.state.eos.getInfo({}, function(err, result) {
        const eos = this.state.eos;
        const state = this.state;
        const us = this;
      const resulto = eos.getTableRows(true, "testacc", "testacc", "agreement", "acc", null, null, null, "i64", 1);
          resulto.then(function (value) {
            const newSize = value.rows[0].renters.length;
            if (state.size === -1){
              console.log("Setting initial size...")
                us.setState({size: newSize});
              //TODO
              document.querySelector("code").nodeValue = "fsa";
            } else if(state.size !== newSize){
              console.log("State changed!")
                us.setState({size: newSize});
            }
          });
      this.setState({head_block_num: result.head_block_num });
      this.setState({action_result: resulto});
    }.bind(this));
  }

  render() {
      return (
      <div>
    <h2> BlockDetails: (BlockNumber: {this.state.head_block_num}) </h2>
    <h2> Actions: {this.state.action_result.actions} </h2>
    </div>
  );
}
}

export default EOSUI;
