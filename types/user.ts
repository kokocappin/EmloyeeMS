export type User = {
  id: string;
  name: string;
  email: string;
  role: string;

  phone?: string | null;
  address?: string | null;
  department?: string | null;
  position?: string | null;

  birthdate?: string | null;
  salary?: string | null;
  sex?: string | null;
  notes?: string | null;

  isActive?: boolean;
};