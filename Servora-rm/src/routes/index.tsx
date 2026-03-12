import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    // path: '/login',
    // element: <Login />,
  },
  {
    // path: '/register',
    // element: <Register />,
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