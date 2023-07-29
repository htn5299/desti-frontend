import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { apiSlice } from './api/apiSlice'
import userSlice from './features/userSlice'
import authSlice from './features/authSlice'
import appSlice from './features/appSlice'
import placeSlice from './features/placeSlice'
import locationSlice from './features/locationSlice'
import notificationSlice from './features/notificationSlice'
import conversationSlice from './features/conversationSlice'
import messagesSlice from './features/messagesSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  user: userSlice,
  context: appSlice,
  places: placeSlice,
  location: locationSlice,
  notifications: notificationSlice,
  conversations: conversationSlice,
  messages: messagesSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiSlice.middleware),
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
