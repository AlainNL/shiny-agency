import produce from 'immer'
import { selectFreelance } from '../utils/selectors'
import { createAction } from '@reduxjs/toolkit'

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

const freelancesFetching = createAction('freelance/fetching')
const freelanceResolved = createAction('freelance/resolved')
const freelancesRejected = createAction('freelance/resolved')


export async function fetchOrUpdateFreelance(store, freelanceId) {
    const selectFreelanceById = selectFreelance(freelanceId)
    const status = selectFreelanceById(store.getState()).status
    if (status === 'pending' || status === 'updating') {
      return
  }
  store.dispatch(freelancesFetching())
  try {
    const response = await fetch(`http://localhost:8000/freelance?id=${freelanceId}`)
    const data = await response.json()
    store.dispatch(freelanceResolved(data))
  } catch (error) {
    store.dispatch(freelancesRejected(error))
  }
}

export default function createReducer(initialState, (builder) =>
  builder
    .addCase(freelancesFetching, (draft) => {
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
    })
    .addCase(freelancesResolved, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.data = action.payload
        draft.status = 'resolved'
        return
      }
      return
    })
    .addCase(freelancesRejected, (draft, action) => {
      if (draft.status === 'pending' || draft.status === 'updating') {
        draft.status = 'rejected'
        draft.error = action.payload
        draft.data = null
        return
      }
      return
    })
)
