import React, { Component } from 'react';
import Advertisement from './Advertisement';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 150px
`;

const List = styled.ul`
  width: 34%;
  margin: auto;
  list-style-type: none;
`;


class Board extends Component {
  render() {
    let items = this.props.items.map(ad =>{
      return (
        ad.encrypted ? null :
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
      <Wrapper>
        <List>
          {items}
        </List>
      </Wrapper>
    );   
  }
}

export default Board;