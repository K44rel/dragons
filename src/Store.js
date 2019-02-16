import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  border-color: #ffb400;
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-size: 100%;
  background: rgba(255, 255, 255);
  margin-left: 9px;

  :disabled{
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Wrapper = styled.li`
  margin: 0 0 4px 0;
  background: beige;
  border-radius: 10px;
  padding: 2px 10px 2px 10px;
`;

const List = styled.ul`
  width: 92%;
  list-style-type: none;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1px;
  align-items: center;
`;



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
          <Wrapper>
            <Flex>
              <div>Name: {listing.name} </div>
              <div>
                Cost: {listing.cost} 
                {this.props.gold >= listing.cost ? 
                <Button onClick={() => this._handlePurchase(listing.id)}>buy</Button>
                :
                <Button disabled>buy</Button>   
                }
              </div>
            </Flex>         
          </Wrapper>
        );
      });
  
      return (
        <List>
          {items}
        </List>
      );
    }
  }
  
export default Store;