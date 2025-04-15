import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, History, Settings, TrendingUp, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/calendar', icon: Calendar, label: 'Calendário' },
    { path: '/history', icon: History, label: 'Histórico' },
    { path: '/progress', icon: TrendingUp, label: 'Progresso' },
    { path: '/measurements', icon: Ruler, label: 'Medidas' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`
                    flex flex-col items-center justify-center
                    px-3 py-2 rounded-lg
                    transition-colors duration-200
                    ${isActive 
                      ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 