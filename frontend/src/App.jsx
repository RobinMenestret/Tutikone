import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Navbar from './components/Navbar';
import { UserProvider } from './UserContext';
import Callback from './pages/Callback';
import EmailConfirmation from './pages/EmailConfirmation';
import ResetPassword from './pages/ResetPassword';
import QuestionForm from './pages/QuestionForm';
import ContributePage from './pages/ContributePage';
import BrowseDatabase from './pages/BrowseDatabase';

const Layout = () => (
  <>
    <Navbar />
    <div className="container">
      <Outlet />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/settings', element: <Settings /> },
      { path: '/callback', element: <Callback /> },
      { path: '/confirm/:token', element: <EmailConfirmation /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/reset-password/:token', element: <ResetPassword /> },
      { path: '/question-form', element: <QuestionForm /> },
      { path: '/contribute', element: <ContributePage /> },
      { path: '/browse', element: <BrowseDatabase />}
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;