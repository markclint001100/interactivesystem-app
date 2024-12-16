import { useNavigate, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../utils/constants';
import { SidebarButton } from './SidebarButton';
import { X } from 'lucide-react';

interface SidebarProps {
  activePlatform: string;
  setActivePlatform: (platform: string) => void;
  onClose: () => void;
}

export function Sidebar({ activePlatform, setActivePlatform, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (itemId: string) => {
    if (itemId === 'home') {
      setActivePlatform('');
      navigate('/');
    } else {
      setActivePlatform(itemId);
      navigate(`/platform/${itemId}`);
    }
    onClose();
  };

  const isItemActive = (itemId: string) => {
    if (itemId === 'home') {
      return location.pathname === '/';
    }
    return location.pathname === `/platform/${itemId}` && activePlatform === itemId;
  };

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-primary">IBS APP</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <SidebarButton
              key={item.id}
              item={item}
              isActive={isItemActive(item.id)}
              onClick={() => handleClick(item.id)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}