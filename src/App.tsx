import { Routes, Route } from "react-router"

import MainLayout from "./components/layouts/MainLayout"

import WelcomePage from "./pages/welcome-page"
import LoginPage from "./pages/login-page"
import SignupView from "./pages/signup/view/signup-view"
import ForgotPasswordView from "./pages/forgot-password/view/forgot-password-view"
import AccountPage from "./pages/settings/account-page"
import SettingsPage from "./pages/settings/settings-page"
import SecurityPage from "./pages/settings/security/view/security-view"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/security" element={<SecurityPage />} />
      </Route>
    </Routes>
  )
}

export default App
