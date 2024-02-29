import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import Dashboard from "./pages/Dashboard"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage"
import { UserContextProvider } from "./context/UserContext"
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/board" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
