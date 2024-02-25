import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import Dashboard from "./pages/Dashboard"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage"
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/board" element={<Dashboard />} />
      <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
    </Routes>
  )
}

export default App
