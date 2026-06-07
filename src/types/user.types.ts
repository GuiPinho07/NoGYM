export interface UserProfile {
  firstName?: string;
  lastName?: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  limitations?: string; // Physical Limitations/Injuries
}
