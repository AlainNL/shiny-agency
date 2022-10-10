import { combineReducers, legacy_createStore as createStore } from "redux"
import themeReducer from '../features/theme.js'
import freelancesReducer from "../features/freelances.js"
import surveyReducer from '../features/survey.js'
import freelanceReducer from '../features/freelance.js'


const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const reducer = combineReducers({
  theme: themeReducer,
  freelances: freelancesReducer,
  survey: surveyReducer,
  freelance: freelanceReducer,
})

const store = createStore(reducer, reduxDevtools)

export default store
