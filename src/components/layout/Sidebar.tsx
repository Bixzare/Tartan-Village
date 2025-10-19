import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { 
  LayoutDashboard, 
  Megaphone,
  Calendar,
  LogOut
} from 'lucide-react';
import tartanLogo from 'figma:asset/089a137b239c6ba347a7881c5dcd44d209edca86.png';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userName: string;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
];

export function Sidebar({ activeTab, onTabChange, onLogout, userName }: SidebarProps) {
  return (
    <div className="w-64 bg-white flex flex-col h-full border-r border-gray-200">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center">
          <img src={tartanLogo} alt="Tartan Village" className="w-full h-auto" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-10 text-[#5B5B5B] hover:text-[#9C0022] hover:bg-gray-50",
                    activeTab === item.id && "bg-[#9C0022] text-white hover:bg-[#C41230] hover:text-white"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile and Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-[#5B5B5B]">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-[#5B5B5B]">{userName}</p>
            <p className="text-xs text-gray-400">Guest</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-[#5B5B5B] hover:text-[#9C0022] hover:bg-gray-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
