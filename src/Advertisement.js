import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  background: beige;
  padding: 20px;
  border-radius: 16px;
  margin: 0 0 8px 0;
  border: 1px
`;

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border-color: #ffb400;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 100%;
  background: rgba(255, 255, 255, 0.5);
  margin-left: 9px;
`;

const H2 = styled.h2`
  font-weight: 500;
  margin: 10px;
`;

const P = styled.p`
  margin-left: 10px;
`;

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
        <Wrapper>
          <H2>{message}</H2>
          <P>
            Difficulty: {probability}<br />
            Reward: {reward}
          </P> 
          <Button onClick={this.tryAd}>Attempt</Button>
        </Wrapper>        
      );
    }
  }

  export default Advertisement;