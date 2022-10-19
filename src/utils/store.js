import themeReducer from '../features/theme.js'
import freelancesReducer from "../features/freelances.js"
import surveyReducer from '../features/survey.js'
import freelanceReducer from '../features/freelance.js'
import resultsReducer from '../features/results.js'
import answersReducer from '../features/answers.js'
import { configureStore } from "@reduxjs/toolkit"


export default configureStore({
  reducer: {
    theme: themeReducer,
    freelances: freelancesReducer,
    survey: surveyReducer,
    freelance: freelanceReducer,
    results: resultsReducer,
    answers: answersReducer,
  },
})
