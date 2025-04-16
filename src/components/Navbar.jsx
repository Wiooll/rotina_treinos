import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, History, TrendingUp, Ruler, Settings } from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/planner', icon: Calendar, label: 'Treinos' },
    { path: '/history', icon: History, label: 'Histórico' },
    { path: '/progress', icon: TrendingUp, label: 'Progresso' },
    { path: '/measurements', icon: Ruler, label: 'Medidas' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:static md:border-t-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 