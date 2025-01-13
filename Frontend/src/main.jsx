import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { UserProvider } from "./UserProvider"; // Import the provider

import App from './App.jsx'


import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
<App/>
</UserProvider>
  </StrictMode>,
)
