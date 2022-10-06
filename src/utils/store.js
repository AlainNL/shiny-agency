import { combineReducers, legacy_createStore as createStore } from "redux";
import themeReducer from '../features/theme.js'


const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducer = combineReducers({
  theme: themeReducer,
})

const store = createStore(reducer, reduxDevtools)

export default store
