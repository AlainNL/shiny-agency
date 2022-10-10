import produce from 'immer'
import { selectFreelances } from '../utils/selectors'

const initialState = {

  status: 'void',
  date: null,
  error: null,
}

const FETCHING = 'freelances/fetching'
const RESOLVED = 'freelances/resolved'
const REJECTED = 'freelances/rejected'

const freelancesFetching = () => ({ type: FETCHING })
const freelancesResolved = (data) => ({ type: RESOLVED, payload: data })
const freelancesRejected = (error) => ({ type: REJECTED, payload: error })

export default function freelancesReducer(state = initialState,action) {
    return produce(state, (draft) => {
      switch (action.type) {
        case FETCHING: {
          if (draft.status === 'void') {
            draft.status = 'pending'
            return
          }
          if (draft.status === 'rejected') {
            draft.error = null
            draft.status = 'pending'
            return
          }
          if (draft.status === 'resolved') {
            draft.status = 'updating'
            return
          }
          return
        }
        case RESOLVED: {
          if (draft.status === 'pending' || draft.status === 'updating') {
            draft.data = action.payload
            draft.status = 'resolved'
            return
          }
          return
        }
        case REJECTED: {
          if (draft.status === 'pending' || draft.status === 'updating') {
            draft.status = 'rejected'
            draft.error = action.payload
            draft.data = null
            return
        }
          return
      }
      default:
          return
    }
  })
}
