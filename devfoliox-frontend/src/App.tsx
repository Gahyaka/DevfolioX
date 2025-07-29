import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Blog from '@/pages/Blog'
import Learning from '@/pages/Learning'
import About from '@/pages/About'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout>
              <Projects />
            </Layout>
          } />
          <Route path="/blog" element={
            <Layout>
              <Blog />
            </Layout>
          } />
          <Route path="/learning" element={
            <Layout>
              <Learning />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <About />
            </Layout>
          } />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <div className="text-center py-16">
                  <h2 className="text-2xl font-bold mb-4">Page Under Construction</h2>
                  <p className="text-muted-foreground">This dashboard page is being built.</p>
                </div>
              </DashboardLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
