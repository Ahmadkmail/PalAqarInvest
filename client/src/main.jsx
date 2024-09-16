// eslint-disable-next-line no-unused-vars
import {PersistGate} from 'redux-persist/integration/react'
// Used in JSX below
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)
