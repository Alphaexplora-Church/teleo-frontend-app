import { Routes, Route } from "react-router"
import WelcomeScreen from "./pages/welcome-page"
import LoginPage from "./pages/login-page"
import MainLayout from "./components/layouts/MainLayout"
import SignupView from "./pages/signup/view/signup-view"
import ForgotPasswordView from "./pages/forgot-password/view/forgot-password-view"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
      </Route>
    </Routes>
  )
}

export default App
