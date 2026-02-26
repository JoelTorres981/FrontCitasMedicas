import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import { Register } from './pages/Register'
import Dashboard from './layout/Dashboard'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import { NotFound } from './pages/NotFound'
import Pacientes from './pages/Pacientes'

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoute />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='dashboard/*' element={
            <ProtectedRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<Pacientes />} />
                  <Route path='pacientes' element={<Pacientes />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App