import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';

//get current profile
export const getCurrentProfile = () => dispathc => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then( res =>
      dispathc({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch( err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
}

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}
