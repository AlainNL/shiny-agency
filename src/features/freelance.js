import { selectFreelance } from '../utils/selectors'
import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = {

}

const freelanceFetching = createAction('freelance/fetching', (freelanceId) => ({
  payload: { freelanceId },
}))
const freelanceResolved = createAction('freelance/resolved', (freelanceId, data) => ({
  payload: { freelanceId, data },
}))

const freelanceRejected = createAction('freelance/rejected', (freelanceId, error) => ({
  payload: { freelanceId, error },
}))

export function fetchOrUpdateFreelance(freelanceId) {
  return async (dispatch, getState) => {
    const selectFreelanceById = selectFreelance(freelanceId)
    const status = selectFreelanceById(getState()).status
    if (status === 'pending' || status === 'updating') {
        return
    }
    dispatch(freelanceFetching(freelanceId))
    try {
      const response = await fetch(`http://localhost:8000/freelance?id=${freelanceId}`)
      const data = await response.json()
      dispatch(freelanceResolved(freelanceId, data))
    } catch (error) {
      dispatch(freelanceRejected(freelanceId, error))
    }
  }
}

function setVoidIfUndefined(draft, freelanceId) {
  if (draft[freelanceId] === undefined) {
    draft[freelanceId] = { status: 'void'}
  }
}

export default createReducer( initialState, (builder) =>
  builder
    .addCase(freelanceFetching, (draft, action) => {
      setVoidIfUndefined(draft, action.payload.freelanceId)
      if (draft[action.payload.freelanceId].status === 'void') {
        draft[action.payload.freelanceId].status = 'pending'
        return
      }
      if (draft[action.payload.freelanceId].status === 'rejected') {
        draft[action.payload.freelanceId].status = null
        draft[action.payload.freelanceId].status = 'pending'
        return
      }
      if (draft[action.payload.freelanceId].status === 'resolved') {
        draft[action.payload.freelanceId].status = 'updating'
        return
      }
    })
    .addCase(freelanceResolved, (draft, action) => {
      setVoidIfUndefined(draft, action.payload.freelanceId)
      if (
        draft[action.payload.freelanceId].status === 'pending' ||
        draft[action.payload.freelanceId].status === 'updating'
      ) {
        draft[action.payload.freelanceId].data = action.payload.data
        draft[action.payload.freelanceId].status = 'resolved'
        return
      }
      return
    })
    .addCase(freelanceRejected, (draft, action) => {
      setVoidIfUndefined(draft, action.payload.freelanceId)
      if (
        draft[action.payload.freelanceId].status === 'pending' ||
        draft[action.payload.freelanceId].status === 'updating'
      ) {
        draft[action.payload.freelanceId].error = action.payload.error
        draft[action.payload.freelanceId].data = null
        draft[action.payload.freelanceId].status = 'rejected'
        return
      }
      return
    })
)
