import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import MemberDashboard from './pages/MemberDashboard';
import authService from './services/authService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khởi tạo và khôi phục phiên đăng nhập từ Bearer Token & LocalStorage
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      const user = authService.getCurrentUser();

      if (token && user) {
        setCurrentUser(user);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-mono">Đang khởi tạo hệ thống NEXUS Cloud...</p>
        </div>
      </div>
    );
  }

  // NẾU CHƯA ĐĂNG NHẬP -> TRANG LOGIN
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // NẾU ĐÃ ĐĂNG NHẬP -> CHUYỂN HƯỚNG TỚI TRANG ĐÚNG VAI TRÒ (ROLE-BASED DASHBOARD)
  switch (currentUser.role) {
    case 'ADMIN':
      return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
    
    case 'EMPLOYEE':
      return <EmployeeDashboard user={currentUser} onLogout={handleLogout} />;
    
    case 'MEMBER':
    default:
      return <MemberDashboard user={currentUser} onLogout={handleLogout} />;
  }
}

export default App;
