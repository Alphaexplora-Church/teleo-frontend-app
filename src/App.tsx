import { Routes, Route } from "react-router"

import MainLayout from "./components/layouts/MainLayout"

import WelcomePage from "./pages/welcome-page"
import LoginPage from "./pages/login-page"
import SignupView from "./pages/signup/view/signup-view"
import TermsPage from "./pages/terms-page"
import ForgotPasswordView from "./pages/forgot-password/view/forgot-password-view"
import AccountPage from "./pages/settings/account-page"
import SettingsPage from "./pages/settings/settings-page"
import SecurityPage from "./pages/settings/security/view/security-view"
import LandingPage from "./pages/landing/landing-page"
import LibraryPage from "./pages/library-page"
import SectionAllPage from "./pages/library/section-all-page"
import NotificationsPage from "./pages/notifications-page"
import CourseDetailPage from "./pages/course/course-detail-page"



const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/library/section" element={<SectionAllPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/course/detail" element={<CourseDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
