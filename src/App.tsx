import { Routes, Route } from "react-router"

import MainLayout from "./components/layouts/MainLayout"
import AuthenticatedLayout from "./components/layouts/AuthenticatedLayout"
import { ROUTES } from "./lib/routes"

import WelcomePage from "./features/welcome/welcome.view"
import LoginPage from "./features/login/login.view"
import SignupView from "./features/register/register.view"
import TermsPage from "./features/terms/terms.view"
import ForgotPasswordView from "./features/forgot-password/forgot-password.view"
import AccountPage from "./features/settings/account.view"
import SettingsPage from "./features/settings/settings.view"
import SecurityPage from "./features/settings/security/security.view"
import LandingPage from "./features/landing/landing.view"
import LibraryPage from "./features/library/library.view"
import SectionAllPage from "./features/library/section-all.view"
import NotificationsPage from "./features/notifications/notifications.view"
import CourseDetailPage from "./features/library/course-detail/course-detail.view"



const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.root} element={<WelcomePage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignupView />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPasswordView />} />
      </Route>

      <Route element={<AuthenticatedLayout />}>
        <Route path={ROUTES.landing} element={<LandingPage />} />
        <Route path={ROUTES.library} element={<LibraryPage />} />
        <Route path={ROUTES.librarySection} element={<SectionAllPage />} />
        <Route path={ROUTES.settings} element={<SettingsPage />} />
        <Route path={ROUTES.account} element={<AccountPage />} />
        <Route path={ROUTES.security} element={<SecurityPage />} />
        <Route path={ROUTES.notifications} element={<NotificationsPage />} />
        <Route path={ROUTES.courseDetail} element={<CourseDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
