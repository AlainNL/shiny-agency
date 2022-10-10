import produce from 'immer'
import { selectFreelance } from '../utils/selectors'

const initialState = {

}

const FETCHING = 'freelance/fetching'
const RESOLVED = 'freelance/resolved'
const REJECTED = 'freelance/resolved'

const freelancesFetching = (freelanceId) => ({
  type: FETCHING,
  payload: { freelanceId },
})

const freelanceResolved = (freelanceId, data) => ({
  type: RESOLVED,
  payload: { freelanceId, data},
})

const freelanceRejected = (freelanceId, error) => ({
  type: REJECTED,
  payload: { freelanceId, error},
})

export async function fetchOrUpdateFreelance(store, freelanceId) {
    const selectFreelanceById = selectFreelance(freelanceId)
    const status = selectFreelanceById(store.getState()).status
    if (status === 'pending' || status === 'updating') {
      return
  }
  store.dispatch(freelancesFetching(freelanceId))
  try {
    const response = await fetch(`http://localhost:8000/freelance?id=${freelanceId}`)
    const data = await response.json()
    store.dispatch(freelanceResolved(freelanceId, data))
  } catch (error) {
    store.dispatch(freelanceRejected(freelanceId, error))
  }
}

export default function freelanceReducer(state = initialState, action) {
  const { type, payload } = action
  return produce(state, (draft) => {
    if (type === RESOLVED || type === FETCHING || type === REJECTED ) {
      if (draft[payload.freelanceId] === undefined) {
        draft[payload.freelanceId] = { status: 'void'}
      }
    }
    switch (type) {
      case FETCHING: {
        if (draft[payload.freelanceId].status === 'void') {
          draft[payload.freelanceId].status = 'pending'
          return
        }
        if (draft[payload.freelanceId].status === 'rejected') {
          draft[payload.freelanceId].status = null
          draft[payload.freelanceId].status = 'pending'
          return
        }
        if (draft[payload.freelanceId].status === 'resolved') {
          draft[payload.freelanceId].status = 'updating'
          return
        }
        return
      }
      case RESOLVED: {
        if (
          draft[payload.freelanceId].status === 'pending' ||
          draft[payload.freelanceId].status === 'updating'
        ) {
          draft[payload.freelanceId].data = payload.data
          draft[payload.freelanceId].status = 'resolved'
          return
        }
        return
      }
      case REJECTED: {
        if (
          draft[payload.freelanceId].status === 'pending' ||
          draft[payload.freelanceId].status === 'updating'
        ) {
          draft[payload.freelanceId].error = payload.error
          draft[payload.freelanceId].data = null
          draft[payload.freelanceId].status = 'rejected'
          return
        }
        return
      }
      default:
        return
    }
  })
}
