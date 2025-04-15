import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, Upload, Trash2, Info } from 'lucide-react';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  const handleExportData = () => {
    const data = {
      workouts: JSON.parse(localStorage.getItem('workouts') || '[]'),
      completedWorkouts: JSON.parse(localStorage.getItem('completedWorkouts') || '[]'),
      schedule: JSON.parse(localStorage.getItem('schedule') || '{}'),
      bodyMeasurements: JSON.parse(localStorage.getItem('bodyMeasurementsHistory') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workout-tracker-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (data.workouts) localStorage.setItem('workouts', JSON.stringify(data.workouts));
        if (data.completedWorkouts) localStorage.setItem('completedWorkouts', JSON.stringify(data.completedWorkouts));
        if (data.schedule) localStorage.setItem('schedule', JSON.stringify(data.schedule));
        if (data.bodyMeasurements) localStorage.setItem('bodyMeasurementsHistory', JSON.stringify(data.bodyMeasurements));
        
        window.location.reload();
      } catch (error) {
        console.error('Erro ao importar dados:', error);
      }
    };
    reader.readAsText(file);
  };
  
  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Info className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Configurações
          </h1>
        </div>

        <div className="space-y-6">
          {/* Aparência */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              ) : (
                <Sun className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Aparência
              </h2>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Tema Escuro</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                {isDarkMode ? 'Ativado' : 'Desativado'}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Dados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Download className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Gerenciar Dados
              </h2>
            </div>
            
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar Dados
              </motion.button>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Importar Dados
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                    <div className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <Upload className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Escolher Arquivo
                      </span>
                    </div>
                  </label>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearData}
                className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Todos os Dados
              </motion.button>
            </div>
          </motion.div>
          
          {/* Sobre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sobre
              </h2>
            </div>
            
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Versão: 1.0.0</p>
              <p>Desenvolvido com React e Tailwind CSS</p>
              <p>© 2024 Workout Tracker</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 