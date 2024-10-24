export interface IAccountEntity {
  email: string;
  role: string;
  status: number;
  banner: string | null;
  avatar: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  isAuthenticated: number;
}
