// src/layouts/MainLayout.jsx
import { Outlet } from "react-router"

const MainLayout = () => {
  return (
    <div className="app-containercontent flex min-h-svh w-full items-center justify-center p-10 md:p-10">
      <main className="w-full max-w-sm">
        {/* This is where the magic happens: child routes render here */}
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
