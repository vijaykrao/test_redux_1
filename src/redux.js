import { applyMiddleware, combineReducers, createStore } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

// actions.js
export const successNew = (movie,totalResults) => ({
  type: 'SUCCESS_NEW_MOVIE',
  movie,
  totalResults
});

export const failureNew = movie => ({
  type: 'ERROR_NEW_MOVIE',
  movie,
});

export const reqNew = (movie,totalResults ) => ({
  type: 'req_NEW_MOVIE',
  movie,
  totalResults
});

export const success = (movie,totalResults) => ({
  type: 'SUCCESS_MOVIE',
  movie,
  totalResults
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
            res =>  dispatch(success( res.data.Search, parseInt(res.data.totalResults))),
            error => dispatch(failure( error))
        );
   
  } catch (error) {
    dispatch(clearMovie ());
  }
};

export const getNewMovies = ((query,pageNumber )=> async dispatch => {

  console.log("NEWMOVIE CALLED ", query,pageNumber )
  dispatch(reqNew([]))
  try {
    let cancel;
     axios({
      method:'GET',
      url:'http://www.omdbapi.com/?apikey=b9bd48a6',
      params:{s:query,page: pageNumber},
      cancelToken: new axios.CancelToken(c => cancel = c )
  }).then(
            res =>  dispatch(successNew( res.data.Search, res.data.totalResults),()=>{console.log("RESULT IN ACTION SUCCESS", res)}),
            error => dispatch(failureNew( error))
        );
   
  } catch (error) {
    dispatch(clearMovie ());
  }
});

// reducers.js
export const movie = (state = [], action) => {
  console.log("ACTION IN REDUCER>>>>",action)
  switch (action.type) {
    case 'SUCCESS_MOVIE':

         return state.concat(action.movie);
         
      
    case 'CLEAR_MOVIE ':
      return [];
      case 'SUCCESS_NEW_MOVIE':
        return   action.movie;
      
      case 'CLEAR_NEW_MOVIE ':
        return [];

      case 'REQ_MOVIE' :
        return []
        case 'ERROR_MOVIE':
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
