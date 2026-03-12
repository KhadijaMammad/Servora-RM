import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { registerSchema, type RegisterRequest } from '../types/auth';
import { useRegisterMutation } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value as string));
    
    try {
      await register(formData).unwrap();
      toast.success("Registration successful! Welcome to Servora.");
      navigate('/login');

    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-100 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5">
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
          <p className="text-slate-500 text-sm">Join the Servora RM system</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" {...formRegister("Name")} error={errors.Name?.message} />
          <Input label="Last Name" {...formRegister("Surname")} error={errors.Surname?.message} />
        </div>

        <Input label="Username" {...formRegister("Username")} error={errors.Username?.message} />
        <Input label="Email" type="email" {...formRegister("Email")} error={errors.Email?.message} />
        <Input label="Password" type="password" {...formRegister("Password")} error={errors.Password?.message} />
        <Input label="Confirm Password" type="password" {...formRegister("ConfirmPassword")} error={errors.ConfirmPassword?.message} />

        <p className="text-slate-500 text-sm">
          Can u have account? <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
        </p>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-2 transition-all shadow-md shadow-blue-200"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};