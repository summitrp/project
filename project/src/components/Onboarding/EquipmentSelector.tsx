import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Equipment } from '../../types';
import { availableEquipment } from '../../data/equipment';

interface EquipmentSelectorProps {
  onNext: (equipment: Equipment[]) => void;
  onBack: () => void;
}

export const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({ onNext, onBack }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);

  const toggleEquipment = (equipment: Equipment) => {
    setSelectedEquipment(prev => {
      const exists = prev.find(eq => eq.id === equipment.id);
      if (exists) {
        return prev.filter(eq => eq.id !== equipment.id);
      } else {
        return [...prev, equipment];
      }
    });
  };

  const handleNext = () => {
    // Always include bodyweight as default
    const bodyweightEquipment = availableEquipment.find(eq => eq.id === 'bodyweight')!;
    const finalEquipment = selectedEquipment.some(eq => eq.id === 'bodyweight') 
      ? selectedEquipment 
      : [bodyweightEquipment, ...selectedEquipment];
    
    onNext(finalEquipment);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-purple-600 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            What equipment do you have?
          </h2>
          <p className="text-gray-600">
            Select all the equipment you have access to. Don't worry, we'll create workouts even if you have nothing!
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {availableEquipment.map(equipment => (
            <button
              key={equipment.id}
              onClick={() => toggleEquipment(equipment)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                selectedEquipment.find(eq => eq.id === equipment.id)
                  ? 'border-purple-600 bg-purple-50 text-purple-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
              }`}
            >
              <div className="font-semibold">{equipment.name}</div>
              <div className="text-sm opacity-70 capitalize">{equipment.category}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <span>Continue</span>
          <ChevronRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};