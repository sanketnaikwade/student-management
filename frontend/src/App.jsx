import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Users, PlusCircle } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import StudentForm from './pages/StudentForm';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Toaster 
          position="top-right" 
          toastOptions={{ 
            style: { background: '#fff', color: '#111827', border: '1px solid #e5e7eb' },
            success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } }
          }} 
        />

        <header>
          <h1>Student Records</h1>
          <p>A sophisticated administration suite</p>
          
          <nav className="nav-tabs">
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? 'nav-btn active' : 'nav-btn')}
              end
            >
              <Users size={16} /> Directory
            </NavLink>
            <NavLink 
              to="/add" 
              className={({ isActive }) => (isActive ? 'nav-btn active' : 'nav-btn')}
            >
              <PlusCircle size={16} /> Add New
            </NavLink>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
