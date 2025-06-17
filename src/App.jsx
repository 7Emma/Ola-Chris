import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './routes/AppRoutes'
import Navbar from './components/Header'
import Footer from './components/Footer'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <AppContext />
      <Footer />
    </BrowserRouter>
  )
}

export default App
