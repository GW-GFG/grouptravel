import { combineReducers } from 'redux';

// import slices
import { addUserToStore } from '../reducers/user';

const rootReducer = combineReducers({
   user: addUserToStore,
});

export default rootReducer;