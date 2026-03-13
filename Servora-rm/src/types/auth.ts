import { z } from 'zod';


export const registerSchema = z.object({
  Name: z.string().min(2, "First name must be at least 2 characters"),
  Surname: z.string().min(2, "Last name must be at least 2 characters"),
  Username: z.string().min(3, "Username must be at least 3 characters"),
  Email: z.string().email("Invalid email address"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
  ConfirmPassword: z.string(),
}).refine((data) => data.Password === data.ConfirmPassword, {
  message: "Passwords do not match",
  path: ["ConfirmPassword"],
});

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  Email: z.string().email("Invalid email address"),
  Password: z.string().min(6, "Password must be at least 6 characters"),
});


export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface AuthResponse {
  data: { token: string; user: any };
  isSuccess: boolean;
  errors: string[];
}

export interface User {
  id: string;
  name: string;
  surname: string;
  role: string;
  mail: string;
}

export const ROLES = ['Admin', 'Waiter', 'Kitchen', 'Warehouse', 'Member'];