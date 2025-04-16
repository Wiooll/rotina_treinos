import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const exerciseCategories = [
  'Peito',
  'Costas',
  'Pernas',
  'Ombros',
  'Bíceps',
  'Tríceps',
  'Abdômen',
  'Cardio'
];

const ExerciseForm = ({ onAddExercise }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome do exercício é obrigatório';
    }
    
    if (!sets || sets < 1) {
      newErrors.sets = 'Número de séries deve ser maior que 0';
    }
    
    if (!reps || reps < 1) {
      newErrors.reps = 'Número de repetições deve ser maior que 0';
    }
    
    if (weight && weight < 0) {
      newErrors.weight = 'Peso não pode ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const exercise = {
      id: Date.now().toString(),
      name: name.trim(),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : null,
      category: category || null
    };

    onAddExercise(exercise);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setSets('');
    setReps('');
    setWeight('');
    setCategory('');
    setErrors({});
  };

  const inputClasses = `w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
    rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-gray-400`;

  const errorInputClasses = `w-full px-4 py-2 bg-white dark:bg-gray-800 border border-red-500 
    rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-gray-400`;

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        Adicionar Exercício
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            Nome do Exercício
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? errorInputClasses : inputClasses}
            placeholder="ex: Supino, Agachamento, etc."
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            Categoria
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClasses}
          >
            <option value="">Selecione uma categoria</option>
            {exerciseCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sets" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            Número de Séries
          </label>
          <input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className={errors.sets ? errorInputClasses : inputClasses}
            min="1"
            placeholder="ex: 3"
          />
          {errors.sets && (
            <p className="text-red-500 text-sm mt-1">{errors.sets}</p>
          )}
        </div>

        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            Número de Repetições
          </label>
          <input
            type="number"
            id="reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={errors.reps ? errorInputClasses : inputClasses}
            min="1"
            placeholder="ex: 12"
          />
          {errors.reps && (
            <p className="text-red-500 text-sm mt-1">{errors.reps}</p>
          )}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={errors.weight ? errorInputClasses : inputClasses}
            min="0"
            step="0.5"
            placeholder="ex: 10"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar Exercício
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ExerciseForm;