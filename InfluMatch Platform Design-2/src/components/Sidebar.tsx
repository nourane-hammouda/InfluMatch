import { Link, useLocation } from 'react-router-dom';
import { Target, LayoutDashboard, Store, FileText, Bell, User, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/marketplace', icon: Store, label: 'Marketplace' },
    { path: '/candidatures', icon: FileText, label: 'Candidatures' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profil', icon: User, label: 'Profil' }
  ];

  return (
    <div className="sidebar bg-white" style={{ width: '280px' }}>
      <div className="p-4 border-bottom">
        <div className="d-flex align-items-center">
          <Target size={32} color="#0d6efd" className="me-2" />
          <span className="fs-4 fw-bold text-primary">InfluMatch</span>
        </div>
      </div>

      <nav className="p-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3 border-top">
        <button
          onClick={onLogout}
          className="sidebar-link w-100 text-danger border-0 bg-transparent"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}
