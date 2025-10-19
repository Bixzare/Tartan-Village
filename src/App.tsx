import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { TartanVillage } from './components/dashboard/TartanVillage';
import { CalendarView } from './components/dashboard/CalendarView';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

interface User {
  id: string;
  name: string;
  role: string;
}

type ActiveTab = 'dashboard' | 'announcements' | 'calendar';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  
  // Guest user
  const user: User = {
    id: 'guest',
    name: 'Guest User',
    role: 'guest'
  };

  const handleLogout = () => {
    toast.success('Logged out successfully.');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'announcements':
        return <TartanVillage />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        userName={user.name}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderMainContent()}
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
