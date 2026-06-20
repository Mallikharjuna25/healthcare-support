import { Routes, Route } from 'react-router-dom'
import Navbar        from './components/Navbar'
import Footer        from './components/Footer'
import ChatBot       from './components/ChatBot'
import ProtectedRoute from './components/ProtectedRoute'
import Home          from './pages/Home'
import About         from './pages/About'
import PatientSupport from './pages/PatientSupport'
import Volunteer     from './pages/Volunteer'
import Contact       from './pages/Contact'
import AdminLogin    from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/"                   element={<Home />} />
          <Route path="/about"              element={<About />} />
          <Route path="/patient-support"    element={<PatientSupport />} />
          <Route path="/volunteer"          element={<Volunteer />} />
          <Route path="/contact"            element={<Contact />} />
          <Route path="/admin/login"        element={<AdminLogin />} />
          <Route path="/admin/dashboard"    element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
      <ChatBot />
    </div>
  )
}
