import React, { Component } from 'react';
import Advertisement from './Advertisement';

class Board extends Component {
  render() {
    let items = this.props.items.map(ad =>{
      return (
        <Advertisement key={ad.adId} 
            id={ad.adId}
            probability={ad.probability} 
            reward={ad.reward} 
            message={ad.message}
            _handleDelete={this.props._handleDelete}
         />
      );
    });
  
    return (
      <ul>{items}</ul>
    );   
  }
}

export default Board;