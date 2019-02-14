import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Popup from 'reactjs-popup'

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


  componentDidMount() { 
    this.startNewGame();
    
  }
  componentDidUpdate() {
    this.fetchAds(this.state.gameId);
  }



  render() {
    
    return (
      this.state.lives < 1 ?
      <div>
        <h1>Game over!</h1>
      </div>
      : 
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
        <div style={{display: "flex"}}>
          <Popup trigger={<button>Store</button>} 
          position="right center" 
          modal
          closeOnDocumentClick
          >
            <div>
              <Store gameId={this.state.gameId} 
              _handlePurchase={this.tryPurchase} 
              listings={this.state.listings}
              updateStore={this.getListings}
              />
            </div>
          </Popup>
        </div>
        <div>
          <List items={this.state.ads} _handleDelete={this.tryAd}/>
        </div>
      </div> 
    );
  }
}

class List extends Component {
  render() {
    let items = this.props.items.map(ad =>{
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

class Store extends Component {
  constructor(props) {
    super(props);
    this._handlePurchase = this._handlePurchase.bind(this);
  }

  _handlePurchase(id) {
    this.props._handlePurchase(id);
  }

  componentDidMount() {
    this.props.updateStore();
  }

  render() {

    let items = this.props.listings.map(listing =>{
      return (
        <li>
          <p>{listing.name} | {listing.cost}</p>
          <button onClick={() => this._handlePurchase(listing.id)}>buy</button>
        </li>
      );
    });

    return (
      <ul>{items}</ul>
    );
  }
}

export default App;
