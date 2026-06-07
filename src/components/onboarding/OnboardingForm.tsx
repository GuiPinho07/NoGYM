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
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    limitations: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    refillPassword: ''
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

  const validateStep1 = () => {
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

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // We are discarding email/password logic, but keeping validation if they try to use it.
    if (formData.password !== formData.refillPassword) {
      newErrors.refillPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const profileData: UserProfile = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
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
      {step === 1 && (
        <>
          <div className="form-grid">
            <Input 
              label="Age" 
              name="age"
              type="number" 
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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

          <div className="form-actions">
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="form-stacked">
            <Input 
              label="First Name" 
              name="firstName"
              type="text" 
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input 
              label="Last Name" 
              name="lastName"
              type="text" 
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <Input 
              label="Email" 
              name="email"
              type="email" 
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input 
              label="Password" 
              name="password"
              type="password" 
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Input 
              label="Refill Password" 
              name="refillPassword"
              type="password" 
              value={formData.refillPassword}
              onChange={handleChange}
              error={errors.refillPassword}
            />
          </div>

          {errors.submit && <div className="form-error-msg">{errors.submit}</div>}

          <div className="form-actions" style={{ display: 'flex', gap: '16px' }}>
            <Button type="button" onClick={() => setStep(1)} variant="secondary" style={{ flex: 1 }}>
              Back
            </Button>
            <Button type="submit" isLoading={isLoading} style={{ flex: 2 }}>
              Save and Continue
            </Button>
          </div>
        </>
      )}
    </form>
  );
};
