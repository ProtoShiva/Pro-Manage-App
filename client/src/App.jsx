import React from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import Dashboard from "./pages/Dashboard"
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
