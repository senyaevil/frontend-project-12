import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom'
import '../assets/styles/styles.scss'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import NotFoundPage from './NotFoundPage.jsx'
import ChatPage from './ChatPage.jsx'
import LoginPage from './LoginPage.jsx'
import Navigation from './Navigation.jsx'
import RegistrationPage from './RegistrationPage'
import routes from '../api/routes.js'

const App = () => {
  const authState = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <div className="vh-100 d-flex flex-column">
        <Navigation />
        <Routes>
          <Route
            path={routes.rootPage()}
            element={authState?.userToken
              ? <ChatPage />
              : <Navigate to={routes.loginPage()} />}
          />
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route path={routes.signupPage()} element={<RegistrationPage />} />
          <Route path={routes.anyPage()} element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer
        theme="colored"
        newestOnTop
      />
    </BrowserRouter>
  )
}

export default App