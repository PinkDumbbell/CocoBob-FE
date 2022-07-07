import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainPage from '@/pages/Main';
import LoginPage from '@/pages/Login';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
        path={'/'}
      />
      <Route element={<LoginPage />} path="/login" />
    </Routes>
  );
}

export default App;
