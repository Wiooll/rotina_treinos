import React, { useState, useEffect } from 'react';
import { Ruler, Plus, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

const BodyMeasurements = () => {
  const [measurements, setMeasurements] = useState({
    weight: '',
    height: '',
    chest: '',
    waist: '',
    hips: '',
    biceps: '',
    thighs: '',
    calves: '',
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('bodyMeasurementsHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMeasurement = {
      ...measurements,
      date: new Date().toISOString(),
    };

    const updatedHistory = [...history, newMeasurement];
    setHistory(updatedHistory);
    localStorage.setItem('bodyMeasurementsHistory', JSON.stringify(updatedHistory));

    setMeasurements({
      weight: '',
      height: '',
      chest: '',
      waist: '',
      hips: '',
      biceps: '',
      thighs: '',
      calves: '',
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Ruler className="w-6 h-6 text-primary-500 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Medidas Corporais
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Adicionar Medidas
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    step="0.1"
                    value={measurements.weight}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={measurements.height}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tórax (cm)
                  </label>
                  <input
                    type="number"
                    name="chest"
                    value={measurements.chest}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cintura (cm)
                  </label>
                  <input
                    type="number"
                    name="waist"
                    value={measurements.waist}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quadril (cm)
                  </label>
                  <input
                    type="number"
                    name="hips"
                    value={measurements.hips}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bíceps (cm)
                  </label>
                  <input
                    type="number"
                    name="biceps"
                    value={measurements.biceps}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Coxas (cm)
                  </label>
                  <input
                    type="number"
                    name="thighs"
                    value={measurements.thighs}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Panturrilhas (cm)
                  </label>
                  <input
                    type="number"
                    name="calves"
                    value={measurements.calves}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Salvar Medidas
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <LineChart className="w-5 h-5 text-primary-500 dark:text-primary-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Histórico
              </h2>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Nenhuma medida registrada ainda.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Adicione suas primeiras medidas usando o formulário ao lado.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.slice().reverse().map((measurement, index) => (
                  <motion.div
                    key={measurement.date}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      {formatDate(measurement.date)}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {measurement.weight && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Peso: {measurement.weight} kg
                        </div>
                      )}
                      {measurement.height && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Altura: {measurement.height} cm
                        </div>
                      )}
                      {measurement.chest && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Tórax: {measurement.chest} cm
                        </div>
                      )}
                      {measurement.waist && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Cintura: {measurement.waist} cm
                        </div>
                      )}
                      {measurement.hips && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Quadril: {measurement.hips} cm
                        </div>
                      )}
                      {measurement.biceps && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Bíceps: {measurement.biceps} cm
                        </div>
                      )}
                      {measurement.thighs && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Coxas: {measurement.thighs} cm
                        </div>
                      )}
                      {measurement.calves && (
                        <div className="text-gray-600 dark:text-gray-300">
                          Panturrilhas: {measurement.calves} cm
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurements; 