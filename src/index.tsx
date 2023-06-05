import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { Provider as ReduxProvider } from 'react-redux'
import { persistor, store } from './redux/store'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { SocketProvider } from './utils/context/SocketContext'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </SocketProvider>
      </PersistGate>
    </ReduxProvider>
  </ThemeProvider>
)

reportWebVitals()
