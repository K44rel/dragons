import React, { Component } from 'react';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import Store from './Store'

const WrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  text-align: left;
  background: #ccffff;
  border-radius: 0px;
  position: fixed;
  width: 100%;
  top: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
  border-radius: 0px;
  width: 100%; 
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 24px;
`;

const Button = styled.button`
  background-color: white;
  color: black;
  border: 2px solid #00ccff;
  border-radius: 8px;
  width: 100px;
  font-weight: bold;
  font-size: 16px;
`;

const Message = styled.p`
  text-align: center;
`;



class InfoPanel extends Component {
  render(){
    const { lives, gold, score, turn, gameId, _handlePurchase, listings, updateStore, message } = this.props;
    return (
      <WrapperBox>
        <InfoWrapper>
          <Text>Lives: {lives}</Text>
          <Text>Gold: {gold}</Text>
          <Text>Score: {score}</Text> 
          <Text>Turn: {turn}</Text>
          <Popup trigger={<Button>Store</Button>} 
            position="right center" 
            modal
            closeOnDocumentClick
            >
              <div>
                <Store 
                  gameId={gameId} 
                  _handlePurchase={_handlePurchase} 
                  listings={listings}
                  updateStore={updateStore}
                />
              </div>
          </Popup>
        </InfoWrapper>
        <Message>{message}</Message>
      </WrapperBox>
   
    )
  }
}

export default InfoPanel;