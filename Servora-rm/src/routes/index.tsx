import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Register } from '../pages/Register';
import { Login } from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" replace />, // Ana səhifəyə gələni registerə atır
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    // element: <MainLayout />, // Bütün admin/waiter/kitchen səhifələri bunun içində olacaq
    children: [
      {
        path: 'admin',
        // element: <AdminDashboard />,
      },
      // Bura digər rol-əsaslı səhifələri əlavə edəcəyik
    ],
  },
]);