import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import './App.css'
import App from './App.tsx'
import ThemeProvider from "./context/themeContext.tsx";
import { ModalProvider } from "./context/modalContext.tsx";
import {VehicleProvider} from "./context/vehicleContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
          <VehicleProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
          </VehicleProvider>
      </ThemeProvider>
  </StrictMode>,
)
