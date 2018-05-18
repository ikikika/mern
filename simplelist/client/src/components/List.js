import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux'; //get state from redux into component
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class List extends Component {

  componentDidMount() { //run when component mount, eg when making api request, running an action
    this.props.getItems();
  }

  render(){
    const { items } = this.props.item;
    return(
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: '2rem'}}
          onClick={()=>{
            const name = prompt('Enter Item');
            if(name){
              this.setState(state=>({
                items: [...state.items, { id: uuid(), name }]
              }))
            }
          }}
        >Add Item</Button>

        <ListGroup>
          <TransitionGroup className="shopping-list">
              {items.map(({ id, name }) => (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={()=>{
                        this.setState(state=>({
                          items: state.items.filter(item => item.id !== id)
                        }));
                      }}
                    >&times;</Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

List.PropTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(List);
//mapStateToProps allows us to take our item state, map state into component properties eg this.prop.items
