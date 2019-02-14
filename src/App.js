import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const PATH_BASE = "https://dragonsofmugloar.com";
const PATH_START = "/api/v2/game/start";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gameId: null,
      lives: 0,
      gold: 0,
      level: 0,
      score: 0,
      highScore: 0,
      turn: 0,
      ads:  [],
      message: "",
    }
    this.startNewGame = this.startNewGame.bind(this);
    this.fetchAds = this.fetchAds.bind(this);
    this.tryAd = this.tryAd.bind(this);
  }

  tryAd(id){
    axios.post(`${PATH_BASE}/api/v2/${this.state.gameId}/solve/${id}`)
    .then(res => {
      console.log(res);
      this.setState({
        lives: res.data.lives,
        gold: res.data.gold,
        score: res.data.score,
        turn: res.data.turn,
        message: res.data.message,
      });
    });

    this.setState(prevState => ({
        ads: prevState.ads.filter(el => el.adId !== id )
    }));

    this.fetchAds(this.state.gameId);
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
          <h2>Lives: {this.state.lives} | 
            Gold: {this.state.gold} | 
            Score: {this.state.score} |  
            Turn: {this.state.turn} | 
            </h2>
        </div>
        <div>
          <p>{this.state.message}</p>
        </div>
        <div>
          <button onClick={() => this.fetchAds(this.state.gameId)}>update</button>
        </div>
        <div>
          <List items={this.state.ads} _handleDelete={this.tryAd}/>
        </div>
      </div>  
    );
  }
}

class List extends React.Component {
  render() {
    var items = this.props.items.map(ad =>{
      return (
        <Advertisement key={ad.adId} 
            id={ad.adId}
            probability={ad.probability} 
            reward={ad.reward} 
            message={ad.message}
            _handleDelete={this.props._handleDelete} />
      );
    });

    return (
      <ul>{items}</ul>
    );
    
  }
}

class Advertisement extends React.Component {
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

export default App;
