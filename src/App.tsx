import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { usuario } = useAuth()
  
  if (!usuario) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function AppRoutes() {
  const navigate = useNavigate()

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <Login 
            onRegisterClick={() => navigate('/cadastro')}
            onLoginSuccess={() => navigate('/dashboard')}
          />
        } 
      />
      <Route 
        path="/cadastro" 
        element={
          <Register 
            onLoginClick={() => navigate('/')}
            onRegisterSuccess={() => navigate('/')}
          />
        } 
      />

      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/store" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App