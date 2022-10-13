import themeReducer from '../features/theme.js'
import freelancesReducer from "../features/freelances.js"
import surveyReducer from '../features/survey.js'
import freelanceReducer from '../features/freelance.js'
import { configureStore } from "@reduxjs/toolkit"


export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
  },
})
