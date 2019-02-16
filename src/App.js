import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import InfoPanel from './InfoPanel';
import Board from './Board';
import Gameover from './Gameover';

const PATH_BASE = "https://dragonsofmugloar.com";
const PATH_START = "/api/v2/game/start";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameId: null,
      lives: 3,
      gold: 0,
      level: 0,
      score: 0,
      highScore: 0,
      turn: 0,
      ads:  [],
      message: "",
      listings : [],
    }
    this.startNewGame = this.startNewGame.bind(this);
    this.fetchAds = this.fetchAds.bind(this);
    this.tryAd = this.tryAd.bind(this);
    this.getListings = this.getListings.bind(this);
    this.tryPurchase = this.tryPurchase.bind(this);

    this.startNewGame();
    
  }

  tryAd(id){
    axios.post(`${PATH_BASE}/api/v2/${this.state.gameId}/solve/${id}`)
    .then(res => {
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

  getListings() {
    axios.get(`${PATH_BASE}/api/v2/${this.state.gameId}/shop`)
    .then(listings =>{
      this.setState({listings: listings.data});
    });
  }

  tryPurchase(itemId) {
    axios.post(`${PATH_BASE}/api/v2/${this.state.gameId}/shop/buy/${itemId}`)
    .then(res => {
      this.setState({
        lives: res.data.lives,
        gold: res.data.gold,
        level: res.data.level,
        turn: res.data.turn,
      });
    });
  }

  componentDidUpdate() {
    this.fetchAds(this.state.gameId);
  }

  render() {
    
    return (
      this.state.lives < 1 ?
      <Gameover />
      : 
      <div>
      <InfoPanel 
        lives={this.state.lives}
        gold={this.state.gold}
        score={this.state.score}
        turn={this.state.turn}
        gameId={this.state.gameId} 
        _handlePurchase={this.tryPurchase} 
        listings={this.state.listings}
        updateStore={this.getListings}
        message={this.state.message}
      />
      <div>
        
        <div>
          <Board items={this.state.ads} _handleDelete={this.tryAd}/>
        </div>
      </div> 
      </div>
    );
  }
}


export default App;