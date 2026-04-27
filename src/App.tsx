import { Routes, Route } from "react-router"
import WelcomeScreen from "./view/WelcomePage"
import LoginPage from "./view/LoginPage"
import MainLayout from "./components/layouts/MainLayout"
import SignupPage from "./view/SignupPage"

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App
