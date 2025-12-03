import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Bell, BellOff, CheckCircle2, Sparkles, MessageSquare, Calendar } from 'lucide-react';
import { mockNotifications } from '../lib/mockData';

interface NotificationsPageProps {
  onLogout: () => void;
}

export default function NotificationsPage({ onLogout }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application_response':
        return <CheckCircle2 size={20} className="text-success" />;
      case 'offer_match':
        return <Sparkles size={20} className="text-primary" />;
      case 'message':
        return <MessageSquare size={20} className="text-purple" />;
      default:
        return <Bell size={20} className="text-muted" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar onLogout={onLogout} />
      <div className="flex-grow-1 d-flex flex-column">
        <TopBar />
        
        <main className="flex-grow-1 p-4">
          <div className="container" style={{ maxWidth: '900px' }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="display-5 mb-2">Notifications</h1>
                <p className="text-muted">
                  {unreadCount > 0 
                    ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
                    : 'Toutes les notifications sont lues'
                  }
                </p>
              </div>
              {unreadCount > 0 && (
                <button className="btn btn-outline-primary" onClick={markAllAsRead}>
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`card border-0 shadow-sm ${
                      !notification.read 
                        ? 'border-start border-primary border-4' 
                        : ''
                    }`}
                  >
                    <div className="card-body p-4">
                      <div className="d-flex gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="mb-0">{notification.title}</h5>
                            {!notification.read && (
                              <span className="badge bg-primary">Nouveau</span>
                            )}
                          </div>
                          
                          <p className="text-muted mb-3">{notification.message}</p>
                          
                          <div className="d-flex align-items-center gap-3">
                            <div className="d-flex align-items-center gap-1 text-muted small">
                              <Calendar size={16} />
                              <span>{formatDate(notification.date)}</span>
                            </div>
                            
                            {!notification.read && (
                              <button
                                className="btn btn-link btn-sm text-decoration-none p-0"
                                onClick={() => markAsRead(notification.id)}
                              >
                                Marquer comme lu
                              </button>
                            )}
                          </div>

                          {/* Action buttons based on type */}
                          {notification.type === 'offer_match' && (
                            <div className="mt-3">
                              <Link to="/marketplace" className="btn btn-sm btn-primary">
                                Voir les offres
                              </Link>
                            </div>
                          )}
                          {notification.type === 'application_response' && (
                            <div className="mt-3">
                              <Link to="/candidatures" className="btn btn-sm btn-primary">
                                Voir mes candidatures
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">
                  <BellOff size={64} className="text-muted mb-4" />
                  <h5 className="mb-2">Aucune notification</h5>
                  <p className="text-muted mb-4">
                    Vous n'avez pas encore de notifications
                  </p>
                  <Link to="/marketplace" className="btn btn-primary">
                    Explorer le marketplace
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
