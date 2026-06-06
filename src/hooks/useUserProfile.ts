import { useState, useEffect } from 'react';
import type { UserProfile } from '../types/user.types';

const STORAGE_KEY = 'nogym_user_profile';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        // Simulate async delay for future backend replacement
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProfile(JSON.parse(stored));
        }
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const saveProfile = async (newProfile: UserProfile): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate async delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
      return true;
    } catch (err) {
      setError('Failed to save profile data.');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    saveProfile,
  };
};
