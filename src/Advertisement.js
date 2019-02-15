import React, { Component } from 'react';

class Advertisement extends Component {
    constructor(props) {
      super(props);
      this.tryAd = this.tryAd.bind(this);
    }
  
    tryAd() {
      this.props._handleDelete(this.props.id)
    }
  
    render() {
      const { probability, reward, message } = this.props;
  
      return (
        <li>
          <h1>Difficulty: {probability}</h1>
          <h1>Reward: {reward}</h1>
          <p>{message}</p>
          <button onClick={this.tryAd}>try</button>
        </li>
      );
    }
  }

  export default Advertisement;