import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Tarjeta from './pages/Tarjeta.jsx';
import PersonasList from './pages/PersonasList.jsx';
import './App.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/tarjeta', label: 'Formulario' },
  { path: '/personas', label: 'Personas' },
];

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink to="/" className="logo-link">
          Mini formulario
        </NavLink>
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tarjeta" element={<Tarjeta />} />
          <Route path="/personas" element={<PersonasList />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
