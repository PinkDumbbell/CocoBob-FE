import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import Helmet from 'react-helmet';
import PrivateRoutes from './routes/PrivateRoutes';
import PageTransition from './components/transition/PageTransition';

function App() {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <link
          type="text/css"
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
        />
      </Helmet>
      <PageTransition transitionKey={location.key}>
        <Routes location={location}>
          <Route element={<PrivateRoutes />} path="/*" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </PageTransition>
    </>
  );
}

export default App;
