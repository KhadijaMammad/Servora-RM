import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../api/authApi';
import { loginSchema, type LoginRequest } from '../../types/auth';
import { setCredentials } from '../../store/authSlice';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const Login = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      // DÜZƏLİŞ: FormData yaradırıq, çünki backend "multipart/form-data" gözləyir
      const formData = new FormData();
      formData.append("Email", data.Email);
      formData.append("Password", data.Password);

      // JSON əvəzinə formData göndəririk
      const result = await login(formData as any).unwrap();
      
      // Backend cavabına uyğun yoxlama
      if (result.isSuccess) {
        dispatch(setCredentials({ 
          token: result.data.token, 
          user: result.data.user 
        }));
        toast.success("Welcome back!");
        window.location.href = "/admin"; 
      } else {
        toast.error(result.errors?.[0] || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.errors?.[0] || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5"
      >
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
          <p className="text-slate-500 text-sm">Enter your credentials to access your account</p>
        </div>
        
        <Input 
          label="Email" 
          type="email" 
          {...register("Email")} 
          error={errors.Email?.message} 
        />
        <Input 
          label="Password" 
          type="password" 
          {...register("Password")} 
          error={errors.Password?.message} 
        />

        <p className="text-slate-500 text-sm">
            Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign Up</a>
        </p>

        <Button 
          type="submit" 
          isLoading={isLoading} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mt-2 transition-all shadow-md shadow-blue-200"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};