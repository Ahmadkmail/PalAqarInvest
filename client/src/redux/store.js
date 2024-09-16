import { configureStore, combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'
import { persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user});
const presistedConfige = {
  key: 'root',
  storage,
  version:1
}
const presistedreducer = persistReducer(presistedConfige,rootReducer )
export const store = configureStore({
  reducer: presistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

