import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

// actions.js
export const success = movie => ({
  type: 'SUCCESS_MOVIE',
  movie,
});

export const failure = movie => ({
  type: 'ERROR_MOVIE',
  movie,
});

export const request = movie => ({
  type: 'REQ_MOVIE',
  // movie,
});

export const clearMovie  = () => ({ type: 'CLEAR_MOVIE ' });

export const getMovies = (query,pageNumber )=> async dispatch => {
  try {
    let cancel;
     axios({
      method:'GET',
      url:'http://www.omdbapi.com/?apikey=b9bd48a6',
      params:{s:query,page: pageNumber},
      cancelToken: new axios.CancelToken(c => cancel = c )
  }).then(
            res =>  dispatch(success( res.data.Search)),
            error => dispatch(failure( error))
        );
   
  } catch (error) {
    dispatch(clearMovie ());
  }
};

// reducers.js
export const movie = (state = [], action) => {
  switch (action.type) {
    case 'SUCCESS_MOVIE':
      return  state.concat(action.movie);
    case 'CLEAR_MOVIE ':
      return [];
    default:
      return state;
  }
};

export const reducers = combineReducers({ movie });

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, applyMiddleware(thunk));
  return store;
}

export const store = configureStore();
