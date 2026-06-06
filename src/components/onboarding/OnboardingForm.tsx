import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { useUserProfile } from '../../hooks/useUserProfile';
import type { UserProfile } from '../../types/user.types';
import './OnboardingForm.css';

interface OnboardingFormProps {
  onComplete: () => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const { saveProfile, isLoading } = useUserProfile();
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    limitations: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Invalid age';
    }
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = 'Invalid weight';
    }
    if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
      newErrors.height = 'Invalid height';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const profileData: UserProfile = {
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      limitations: formData.limitations.trim() || undefined
    };

    const success = await saveProfile(profileData);
    if (success) {
      onComplete();
    } else {
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    }
  };

  return (
    <form className="onboarding-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <Input 
          label="Age" 
          name="age"
          type="number" 
          placeholder="e.g. 28"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
          min="1"
          max="120"
        />
        <Input 
          label="Weight" 
          name="weight"
          type="number" 
          unit="kg"
          placeholder="e.g. 75"
          value={formData.weight}
          onChange={handleChange}
          error={errors.weight}
          min="1"
          max="500"
          step="0.1"
        />
        <Input 
          label="Height" 
          name="height"
          type="number" 
          unit="cm"
          placeholder="e.g. 180"
          value={formData.height}
          onChange={handleChange}
          error={errors.height}
          min="1"
          max="300"
        />
      </div>
      
      <TextArea 
        label="Physical Limitations (Optional)" 
        name="limitations"
        placeholder="e.g. Bad lower back, shoulder injury..."
        value={formData.limitations}
        onChange={handleChange}
        error={errors.limitations}
      />

      {errors.submit && <div className="form-error-msg">{errors.submit}</div>}

      <div className="form-actions">
        <Button type="submit" isLoading={isLoading}>
          Save and Continue
        </Button>
      </div>
    </form>
  );
};
