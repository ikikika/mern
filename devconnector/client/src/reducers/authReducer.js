import { TEST_DISPATCH } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function( state = initialState, action ){
  switch(action.type){
    case TEST_DISPATCH:
      return {
        ...state, //... is spread operater. takes whats already in the state and add to it
        user: action.payload
      }
      default:
        return state;
  }
}
