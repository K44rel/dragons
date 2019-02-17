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
  background: #ffc266;
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
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border-color: #ffb400;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 100%;
  background: rgba(255, 255, 255, 0.5);
  width: 90px;
`;

const Message = styled.div`
  text-align: center;
  font-size: 20px;
  display: table-cell;
  vertical-align: middle;
`;

const MessageWrapper = styled.div`
  margin-top: 10px;
  display: table;
  min-height: 50px;
  max-height: 50px;
  background: blanchedalmond;
`;

const Background = styled.div`
  background: #ffc266;
  width: 99.7%;
  height: 100%;
  padding: 1px;
  margin: 0px;
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
            <Background>
              <Store 
                gameId={gameId} 
                _handlePurchase={_handlePurchase} 
                listings={listings}
                updateStore={updateStore} 
                gold={gold}
              />
            </Background>
          </Popup>
        </InfoWrapper>
        <MessageWrapper>
          <Message>{message}</Message>
        </MessageWrapper>
      </WrapperBox>
   
    )
  }
}

export default InfoPanel;