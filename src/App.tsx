import { Routes, Route } from "react-router"
import WelcomeScreen from "./pages/WelcomePage"
import LoginPage from "./pages/LoginPage"
import MainLayout from "./components/layouts/MainLayout"
import SignupView from "./signup/view/signup-view"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupView />} />
      </Route>
    </Routes>
  )
}

export default App
