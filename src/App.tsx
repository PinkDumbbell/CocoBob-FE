import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import PageTransition from './components/transition/PageTransition';

function App() {
  const location = useLocation();
  return (
    <PageTransition transitionKey={location.key}>
      <Routes location={location}>
        <Route element={<PrivateRoutes />} path="/*" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </PageTransition>
  );
}

export default App;
