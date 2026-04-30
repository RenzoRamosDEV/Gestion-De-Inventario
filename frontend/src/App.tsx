import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-400 text-sm mt-2">Próximamente...</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 ml-56 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<PlaceholderPage title="Reportes" />} />
            <Route path="/users" element={<PlaceholderPage title="Usuarios" />} />
            <Route path="/settings" element={<PlaceholderPage title="Configuración" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
