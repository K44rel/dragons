import React, { Component } from 'react';

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
  
export default Store;