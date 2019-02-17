import React, { Component } from 'react';
import styled from 'styled-components';

const GameOver = styled.div`
  background: black;
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
`;

const Text = styled.h1`
  color: red;
`;

class Gameover extends Component {
  render(){
    return (
      <GameOver>
        <Text>Game over!</Text>
      </GameOver>
    );
  }
}

export default Gameover;