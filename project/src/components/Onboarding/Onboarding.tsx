import React, { useState } from 'react';
import { Welcome } from './Welcome';
import { EquipmentSelector } from './EquipmentSelector';
import { GoalSelector } from './GoalSelector';
import { ProfileSetup } from './ProfileSetup';
import { Equipment, FitnessGoal, User } from '../../types';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [goal, setGoal] = useState<FitnessGoal | null>(null);

  const handleEquipmentNext = (selectedEquipment: Equipment[]) => {
    setEquipment(selectedEquipment);
    setCurrentStep(2);
  };

  const handleGoalNext = (selectedGoal: FitnessGoal) => {
    setGoal(selectedGoal);
    setCurrentStep(3);
  };

  const handleProfileComplete = (user: User) => {
    onComplete(user);
  };

  const steps = [
    <Welcome key="welcome" onNext={() => setCurrentStep(1)} />,
    <EquipmentSelector 
      key="equipment" 
      onNext={handleEquipmentNext}
      onBack={() => setCurrentStep(0)}
    />,
    <GoalSelector 
      key="goal" 
      onNext={handleGoalNext}
      onBack={() => setCurrentStep(1)}
    />,
    <ProfileSetup 
      key="profile" 
      equipment={equipment}
      goal={goal!}
      onComplete={handleProfileComplete}
      onBack={() => setCurrentStep(2)}
    />
  ];

  return steps[currentStep];
};