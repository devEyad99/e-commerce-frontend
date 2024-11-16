import { createRoot } from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import the CSS file with the 'min' suffix
import './global.css';
import AppRouter from './routes/AppRouter';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import "./services/axios-global";

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
   <AppRouter/>
  </PersistGate>
</Provider>
)
