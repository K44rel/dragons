import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const PATH_BASE = "https://dragonsofmugloar.com";
const PATH_START = "/api/v2/game/start";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameId: null,
      lives: 0,
      gold: 0,
      level: 0,
      score: 0,
      highscore: 0,
      turn: 0,
      ads:  [],
    }
    this.startNewGame = this.startNewGame.bind(this);
    this.fetchAds = this.fetchAds.bind(this);
  }

  startNewGame() {
    axios.post(`${PATH_BASE}${PATH_START}`)
    .then(res => {
      this.setState({...res.data});
    });  
    
  }

  fetchAds(gameId) {
     axios.get(`${PATH_BASE}/api/v2/${gameId}/messages`)
     .then(ads => {
      this.setState({ads: ads.data});
     });

     
  }

  componentDidMount() {  
    this.startNewGame();
  }

  render() {
    
    return (
      <div>
        <div>
          <button onClick={() => this.fetchAds(this.state.gameId)}>update</button>
        </div>
        <div>
          <ul>
            { this.state.ads.map(ad => <Advertisement 
            probability={ad.probability} 
            reward={ad.reward} 
            message={ad.message}
            />)}
          </ul>
        </div>
      </div>  
    );
  }
}

class Advertisement extends Component {
  render() {
    const { probability, reward, message} = this.props;

    return (
      <li>
        <h1>Difficulty: {probability}</h1>
        <h1>Reward: {reward}</h1>
        <p>{message}</p>
      </li>
    )
  }
}

export default App;
