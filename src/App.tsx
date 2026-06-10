import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'

type AppView = 'login' | 'register' | 'dashboard'

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>('login')

  return (
    <>
      {currentView === 'login' && (
        <Login 
          onRegisterClick={() => setCurrentView('register')}
          onLoginSuccess={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'register' && (
        <Register 
          onLoginClick={() => setCurrentView('login')}
          onRegisterSuccess={() => setCurrentView('login')}
        />
      )}
      {currentView === 'dashboard' && (
        <Dashboard />
      )}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
