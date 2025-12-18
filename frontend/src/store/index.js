import { configureStore } from '@reduxjs/toolkit'
import authReducer, { actions as authActions } from './slices/authSlice.js'
import uiReducer, { actions as uiActions } from './slices/uiSlice.js'
import Api from './middlewares/index.js'

const { channelsApi, messagesApi } = Api

export const actions = {
  ...authActions,
  ...uiActions,
}

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat([channelsApi.middleware, messagesApi.middleware]),
})
