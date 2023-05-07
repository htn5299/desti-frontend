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
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
)

reportWebVitals()
