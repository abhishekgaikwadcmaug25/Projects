import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/common/Toast';
import FloatingActionButton from './components/common/FloatingActionButton';
import { useToast } from './hooks/useToast';
import './index.css';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toast toasts={toasts} onClose={removeToast} />
        <FloatingActionButton />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
